import request from "request";

const checkWifi = (req, res) => {
    const _res = res;
    request({
        "uri" : "http://cloud2.vnwifi.vn/ClientBusiness/CheckData",
        "method" : "POST",
    }, (err, res, body) => {
        console.log(body);
        _res.send("ok");
    })
}

module.exports = checkWifi;