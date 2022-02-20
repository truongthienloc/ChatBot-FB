export function Button(title, payload) {
    this.type = buttonType.POSTBACK;
    this.title = title;
    this.payload = payload;
}
export function ButtonURL(title, url) {
    this.type = buttonType.WEB_URL;
    this.title = title,
    this.url = url;
}
export const buttonType = {
    POSTBACK : "postback",
    PHONE_NUMBER : "phone_number",
    WEB_URL : "web_url",
    ACCOUNT_LINK : "account_link",
    ACCOUNT_UNLINK : "account_unlink",
} 