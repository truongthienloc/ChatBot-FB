require("dotenv").config();
import request from "request";

const ADMIN_PSID = process.env.ADMIN_PSID;

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
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    }); 
}

const sendFeedback = (sender_psid, text) => {
    const response = {
        "text": `Feedback được gửi bởi khách có psid: ${sender_psid}\nVới nội dung là:\n${text}`
    }
    callSendAPI(ADMIN_PSID, response);
}

module.exports = {
    sendFeedback,
}