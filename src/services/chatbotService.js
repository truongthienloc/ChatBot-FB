require("dotenv").config();
import request from "request";
import { PAGE_ACCESS_TOKEN } from "../constants/envConstants";

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

const handleGetStarted = (sender_psid) => {
    return Promise(async(resolve, reject) => {
        try {
            const response = {"text" : "Chào bạn, tôi có thể giúp gì cho bạn?"}
            await callSendAPI(sender_psid, response);
            resolve(response);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted,
}