require("dotenv").config();
import request from "request";
import { PAGE_ACCESS_TOKEN } from "../constants/envConstants";
import GenericTemplate, {Element} from "../objects/GenericTemplate";
import ButtonTemplate from "../objects/ButtonTemplate";
import { Button, ButtonURL } from "../objects/Button";

import { addCustomerFinance } from "../firebase/index";

import { option_digitalWallet, message_VNPAY, option_VNPAY } from "../public/data/digital_wallet";

const checkMessage = (message) => {
    if(message.slice(0,8).toLowerCase() === "feedback")
        return "feedback";
    
    return "unknown";
}

const option_1 = {
    "attachment" : ButtonTemplate("Chọn 1 trong các lựa chọn bên dưới: ", [
        Button("Trợ giúp", "show_help"), 
        //new ButtonURL("Vào website", "https://cong-nghe.herokuapp.com/")
    ])
};

const option_Finance = {
    "attachment" : GenericTemplate([
        Element("Tài chính", 
        "https://dnbvietnam.com/Uploads/images/news/hieu-qua-tai-chinh-doanh-nghiep-la-gi.jpg",
        "Chọn 1 trong những lựa chọn sau: ", [
            Button("Ví điện tử", "digital_wallet"),
            Button("Đầu tư", "invest"),
            //Button("Vay tiền", "borrow_money")
            Button("Internet Banking", "internet_banking")
        ])
    ])
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
const getGender = (sender_psid) => new Promise((resolve, reject) => {
    let response = {};
    request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        //console.log(body);
        response = JSON.parse(body);
        const gender = response.gender;
        resolve(gender);
    }); 
})
const getProfilePic = (sender_psid) => new Promise((resolve, reject) => {
    let response = {};
    request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        //console.log(body);
        response = JSON.parse(body);
        const profile_pic = response.profile_pic;
        resolve(profile_pic);
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

const handleDigitalWallet = (sender_psid) => {
    let response = {
        "attachment" : option_digitalWallet
    }
    callSendAPI(sender_psid, response);
}
const handleShowVNPAY = async(sender_psid) => {
    const username = await getUserName(sender_psid);
    const gender = await getGender(sender_psid) || "unknown";
    const profile_pic = await getProfilePic(sender_psid);
    const data = {
        appName : "VNPAY",
        date : new Date(),
        gender,
        name : username,
        profile_pic,
        psid : sender_psid
    }
    addCustomerFinance(data);
    let response = message_VNPAY;
    callSendAPI(response);
    response = {
        "attachment" : option_VNPAY
    }
    callSendAPI(sender_psid, response);
}

module.exports = {
    handleGetStarted,
    checkMessage,
    handleDigitalWallet,
    handleShowVNPAY,
    option_Finance,
}