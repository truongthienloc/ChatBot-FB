require("dotenv").config();
import request from "request";
import { PAGE_ACCESS_TOKEN } from "../constants/envConstants";
import GenericTemplate, {Element} from "../objects/GenericTemplate";
import ButtonTemplate from "../objects/ButtonTemplate";
import { Button, ButtonURL } from "../objects/Button";

const checkMessage = (message) => {
    if(message.slice(0,8).toLowerCase() === "feedback")
        return "feedback";
    
    return "unknown";
}

const option_1 = JSON.stringify({
    attachment : new ButtonTemplate("Chọn 1 trong các lựa chọn bên dưới: ", [
        new Button("Trợ giúp", "show_help"), 
        //new ButtonURL("Vào website", "https://cong-nghe.herokuapp.com/")
    ])
});

const option_Finance = {
    "attachment": {
        "type":"template",
        "payload" : new GenericTemplate([
            Element("Tài chính", 
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdnbvietnam.com%2Ftu-van%2Fdanh-gia-hieu-qua-tai-chinh-cua-doanh-nghiep.html&psig=AOvVaw01xx8UseCGSpjUGyumEYL5&ust=1645606275455000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCWoKj3kvYCFQAAAAAdAAAAABAD", "", [
                Button("Ví điện tử", "digital_wallet"),
                Button("Đầu tư", "invest"),
                Button("Vay tiền", "borrow_money")
            ])
        ])
    }
}

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
    checkMessage,
    option_Finance,
}