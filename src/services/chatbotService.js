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
const getUserName = (sender_psid) => new Promise(async(resolve, reject) => {
    let response = {};
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        console.log(body);
        //console.log("res: ", res);
        response = JSON.parse(body);
    }); 

    const username = `${response.last_name} ${response.first_name}`;
    resolve(username);
})

const handleGetStarted = (sender_psid) => {
    return new Promise(async(resolve, reject) => {
        try {
            const username = await getUserName(sender_psid);
            const response = {"text" : `Chào ${username}, tôi có thể giúp gì cho bạn?`}
            await callSendAPI(sender_psid, response);
            resolve("response");
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted,
}