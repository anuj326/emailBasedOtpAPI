const otp = require('./generateOtp')
var jwt = require('jsonwebtoken');

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

    if(otp.expireTime > currentTime){

        const user = {
            id:1,
            email: otp.email
          }
        if(req.body.otp === otp.otp){
            jwt.sign(user, 'secretkey', {expiresIn: '60s'}, function(err, token) {
                if(err){
                  res.statusCode(403)
                }
                else{
                    console.log("token",token)
                    
                  res.json({
                    token
                  })
                }
              });
            
        }else{
    
            res.send("Invalid otp")
        }
        console.log("not expired")
    }else{
        console.log('expried')
        res.send("OTP has been expired")
    }

    

}


module.exports = login;
