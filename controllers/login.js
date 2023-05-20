const otp = require('./generateOtp')
const rateLimit = require('express-rate-limit');

const login = function(req , res){
    console.log("OTP entered by user",req.body)
    console.log("system gen otp",otp.otp)

    function DateFormat(validDate){
        var date = new Date(validDate);
        var days = date.getDate();
        var year = date.getFullYear();
        var month = (date.getMonth()+1);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = days + '/' + month + '/' + year + '/ '+hours + ':' + minutes;
        return strTime;
       }
       var now = new Date();
       var currentTime = DateFormat(now);
       console.log(currentTime);

    // const date = new Date();
    // const currentMin = date.getMinutes()
    // console.log("curent min",currentMin)
    // const validMin = otp.min + 5;
    // console.log("expire time is ",validMin)
    if(otp.expireTime > currentTime){
        if(req.body.otp === otp.otp){
            res.send("Logged in Successfully")
        }else{
    
            res.send("Invalid otp")
        }
        console.log("not expired")
    }else{
        console.log('expried')
        res.send("OTP has been expired")
    }

    

}



const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  max: 5,
  message: `Login error, you have reached maximum retries. Please try again after 30 minutes`, 
  statusCode: 429,
  Headers: true,
});
module.exports = { loginRateLimiter }

module.exports = login;