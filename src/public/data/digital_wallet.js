import GenericTemplate, {Element} from "../../objects/GenericTemplate";
import { Button, ButtonURL } from "../../objects/Button";
// const BUTTON = {
//     name : "",
//     payload : "",
// }
// const MAU = {
//     name : "",
//     subtitle : "",
//     image_url : "",
//     buttons : []
// }
const option_digitalWallet =  GenericTemplate([
    Element("VNPAY", 
    "https://content.accesstrade.vn/adv/1641781820_avatar_1641781820.gif",
    "VNPAY - Ví điện tử đầu tiên dành cho gia đình Việt, đáp ứng đa dạng nhu cầu thanh toán các dịch vụ hàng ngày của bạn và gia đình một cách nhanh chóng, tiện lợi, an toàn.",[
        Button("Tìm hiểu thêm", "show_VNPAY")
    ]),
    //Element("")
])

module.exports = {
    option_digitalWallet,
}