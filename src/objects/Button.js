export function Button(title, payload) {
    return ({
        "type" : buttonType.POSTBACK,
        "title" : title,
        "payload" : payload
    })
}
export function ButtonURL(title, url) {
    return ({
        "type" : buttonType.WEB_URL,
        "title" : title,
        "url" : url
    })
}
export const buttonType = {
    POSTBACK : "postback",
    PHONE_NUMBER : "phone_number",
    WEB_URL : "web_url",
    ACCOUNT_LINK : "account_link",
    ACCOUNT_UNLINK : "account_unlink",
} 