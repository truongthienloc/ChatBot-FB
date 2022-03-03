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
    Element("ViettelPay",
    "https://lh3.google.com/u/0/d/1xMj-Q1IR3_ywmK65gY-QVA1sX9_PvES0=w1920-h932-iv1",
    "ViettelPay – Ngân hàng số của người Việt – dịch vụ chuyển tiền, thanh toán trên di động dành cho mọi người với lợi thế vượt trội. Với các tiện ích: chuyển tiền không giới hạn, thanh toán tiện lợi, hoàn tiền miễn phí và thao tác đơn giản.",[
        Button("Tìm hiểu thêm","show_ViettelPay")
    ])
])
const message_VNPAY = {
    "text" : 'Để đăng kí tài khoản ví điện tử VNPAY, bạn hãy thực hiện các bước sau( có video hướng dẫn bên dưới ):\nB1: Click vào nút "Tải VNPAY" bên dưới.\nB2: Tải và mở ứng dụng Ví VNPAY lên.\nB3: Chọn "Đăng kí".\nB4: Nhập đầy đủ thông tin và nhập mã giới thiệu là "AT" để nhận được những phần quà hấp dẫn.\nB5: Nhấn vào nút "Tiếp tục", sau đó nhập mã OTP(được gửi qua SMS) và cài đặt mã PIN.\nB6: Click vào nút "Định danh & LKNH".\nB7: Chọn loại giấy tờ tùy thân và chụp 2 mặt giấy tờ tùy thân đó và thực hiện xác nhận khuôn mặt.\nB8: Click vào nút "Hoàn thành" và chọn "Liên kết ngân hàng".\nB9: Chọn vào ngân hàng bạn muốn liên kết và điền đầy đủ thông tin tài khoản ngân hàng của bạn.\nBạn có thể Click vào nút "Xem video hướng dẫn" bên dưới.\nChúc bạn có một ngày tốt lành.'
}
const option_VNPAY = GenericTemplate([
    Element("VNPAY", "https://content.accesstrade.vn/adv/1641781820_avatar_1641781820.gif",
        "Tải và đăng kí tài khoản ví VNPAY để nhận được những ưu đãi hấp dẫn nhé!",[
            ButtonURL("Tải VNPAY", "https://shorten.asia/fQEXnDDX"),
            ButtonURL("Xem video hướng dẫn", "https://youtu.be/YpPvnomPUNE")
        ]
    )
])
const message_ViettelPay = {
    "text" : 'Để đăng kí tài khoản ViettelPay, bạn hay thực hiện các bước sau( có video hướng dẫn bên dưới ):\nB1: Nếu hệ điều hành của máy bạn là Android thì Click vào nút "Tải ViettelPay cho Android", còn nếu hệ điều hành của máy bạn là IOS thì click vào nút "Tải ViettelPay cho IOS.\nB2: Sau khi click, bạn sẽ được đưa vào cửa hàng ứng dụng, hãy tải ứng dụng ViettelPay và mở ứng dụng ViettelPay.\nB3: Sau khi mở ứng dụng, bạn ấn các nút "tiếp tục" và "Bắt đầu ngay", sau đó nhập số điện thoại của bạn, sau đó nhấn "tiếp tục", chờ và nhập mã OTP.\nB4: Nhập mật khẩu để tạo mật khẩu cho tài khoản ViettelPay của bạn, sau đó ấn nút "Đăng kí".\nVậy là bạn đó tài khoản ViettelPay rồi, chúc bạn có một ngày tốt lành.'
} 
const option_ViettelPay = GenericTemplate([
    Element("ViettelPay", "https://lh3.google.com/u/0/d/1xMj-Q1IR3_ywmK65gY-QVA1sX9_PvES0=w1920-h932-iv1",
    "Tải và đăng kí tài khoản ViettelPay để nhận được những ưu đãi hấp dẫn nhé!", [
        ButtonURL("Tải ViettelPay cho Android", "https://shorten.asia/xc5QyMtz"),
        ButtonURL("Tải ViettelPay cho IOS", "https://shorten.asia/d7Yv8KTA"),
        ButtonURL("Xem video hướng dẫn", "https://youtu.be/7OqK5G1O9e0")
    ])
])

module.exports = {
    option_digitalWallet,
    message_VNPAY,
    option_VNPAY,
    message_ViettelPay,
    option_ViettelPay,
}