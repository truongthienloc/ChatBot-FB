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
const message_VNPAY = {
    "text" : 'Để đăng kí tài khoản ví điện tử VNPAY, bạn hãy thực hiện các bước sau:\nB1: Click vào nút "Tải VNPAY" bên dưới.\nB2: Tải và mở ứng dụng Ví VNPAY lên.\nB3: Chọn "Đăng kí".\nB4: Nhập đầy đủ thông tin.\nB5: Nhấn vào nút "Tiếp tục", sau đó nhập mã OTP(được gửi qua SMS) và cài đặt mã PIN.\nB6: Click vào nút "Định danh & LKNH".\nB7: Chọn loại giấy tờ tùy thân và chụp 2 mặt giấy tờ tùy thân đó và thực hiện xác nhận khuôn mặt.\nB8: Click vào nút "Hoàn thành" và chọn "Liên kết ngân hàng".\nB9: Chọn vào ngân hàng bạn muốn liên kết và điền đầy đủ thông tin tài khoản ngân hàng của bạn.\nB10: Bạn ra trang chủ của ứng dụng Ví VNPAY, bạn chọn nhập mã giới thiệu mà nhập mã "AT" để được những phần quà hấp dẫn từ ứng dụng Ví VNPAY nhé!\nBạn có thể Click vào nút "Xem video hướng dẫn" bên dưới.\nChúc bạn có một ngày tốt lành.'
}
const option_VNPAY = GenericTemplate([
    Element("VNPAY", "https://content.accesstrade.vn/adv/1641781820_avatar_1641781820.gif",
        "Tải và đăng kí tài khoản ví VNPAY để nhận được những ưu đãi hấp dẫn nhé!",[
            ButtonURL("Tải VNPAY", "https://shorten.asia/fQEXnDDX"),
            ButtonURL("Xem video hướng dẫn", "https://youtu.be/YpPvnomPUNE")
        ]
    )
])

module.exports = {
    option_digitalWallet,
    message_VNPAY,
    option_VNPAY,
}