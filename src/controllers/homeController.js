require("dotenv").config();
import request from "request";
import { PAGE_ACCESS_TOKEN } from "../constants/envConstants";
import { handleGetStarted, checkMessage, option_Finance, handleDigitalWallet, handleShowVNPAY, handleShowViettelPay
} from "../services/chatbotService";
import { sendFeedback } from "../services/adminService";
import { Button } from "../objects/Button";
const getHomePage = (req, res) => {
    return res.render("homepage.ejs");
}

const setupProfile = async(req, res) => {

    let request_body = {
        "get_started":{
            "payload":"get_started"
        },
        "whitelisted_domains" : ["https://cong-nghe.herokuapp.com/"],
        "persistent_menu" : [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions" : [{
                    "type": "postback",
                    "title": "Tài chính",
                    "payload": "persistent_menu_Finance"
                },{
                    "type": "postback",
                    "title": "Mua sắm",
                    "payload": "persistent_menu_Shopping"
                },{
                    "type": "postback",
                    "title": "Công nghệ",
                    "payload": "persistent_menu_Technology"
                }],
            }
        ]
        
    }

    console.log("request_body: ", request_body);

    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/v13.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        console.log(body);
        if (!err) {
            console.log('Set up success!')
        } else {
            console.error("Set up fail:" + err);
        }
    });

    return res.send("Set up success!");
}

const postWebhook = (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
}

const getWebhook = (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {
        const text = received_message.text;
        switch(checkMessage(text)) {
            case "feedback":
                sendFeedback(sender_psid, text.slice(9));
                response = {"text": `Cám ơn bạn đã gửi feedback.`};
                break;
        }
        // Create the payload for a basic text message
        
    } else if (received_message.attachments) { // file đính kèm
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    } 

    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "get_started":
            await handleGetStarted(sender_psid);
            break;
        case "show_help":
            callSendAPI(sender_psid, {
                "text" : "- Bạn có thể ấn vào nút menu ở góc dưới bên phải để sử dụng những chức năng chính.\n- Nếu như bạn có một phải hồi gì hãy sử dụng cú pháp: feedback + <điều bạn muốn phản hồi>.\n"
            })
            break;
        case "persistent_menu_Finance":
            //console.log("option_Finance: ", option_Finance);
            callSendAPI(sender_psid, option_Finance);
            break;
        // case "persistent_menu_Shopping":
        //     break;
        // case "persistent_menu_Technology":
        //     break;
        case "digital_wallet":
            handleDigitalWallet(sender_psid);
            break;
        // case "invest":
        //     break;
        // case "borrow_money":
        //     break;
        case "show_VNPAY":
            handleShowVNPAY(sender_psid);
            break;
        case "show_ViettelPay":
            handleShowViettelPay(sender_psid);
            break;
        default:
            callSendAPI(sender_psid, {"text":"Chức năng sẽ được thêm trong tương lai"});
            break;
    }
    
    // Send the message to acknowledge the postback
    //callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        console.log(body);
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}

module.exports = {
    getHomePage,
    postWebhook,
    getWebhook,
    setupProfile,
}