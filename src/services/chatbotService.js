require("dotenv").config();
import request from "request";
import { PAGE_ACCESS_TOKEN } from "../constants/envConstants";
import GenericTemplate, {Element} from "../objects/GenericTemplate";
import ButtonTemplate from "../objects/ButtonTemplate";
import Button, {buttonType} from "../objects/Button";

const option_1 = JSON.stringify({
    attachment : new ButtonTemplate("Chọn 1 trong các lựa chọn bên dưới: ", [
        new Button(buttonType.POSTBACK, "Xem hàng", "show_product"), 
        new Button(buttonType.WEB_URL, "Vào website", "https://cong-nghe.herokuapp.com/")
    ])
});

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
const getUserName = (sender_psid) => new Promise((resolve, reject) => {
    let response = {};
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        console.log(body);
        response = JSON.parse(body);
        const username = `${response.last_name} ${response.first_name}`;

        resolve(username);
    }); 

})

const handleGetStarted = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            const username = await getUserName(sender_psid);
            const responseFirst = {"text" : `Chào ${username}, tôi có thể giúp gì cho bạn?`}
            await callSendAPI(sender_psid, responseFirst);

            const responseSecond = option_1;
            await callSendAPI(sender_psid, responseSecond);
            resolve("response");
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted,
}