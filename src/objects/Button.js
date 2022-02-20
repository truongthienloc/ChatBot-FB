export default function(type, title, payload) {
    this.type = type;
    this.title = title;
    this.payload = payload;
    this.url = payload;
}
export const buttonType = {
    POSTBACK : "postback",
    PHONE_NUMBER : "phone_number",
    WEB_URL : "web_url",
    ACCOUNT_LINK : "account_link",
    ACCOUNT_UNLINK : "account_unlink",
} 