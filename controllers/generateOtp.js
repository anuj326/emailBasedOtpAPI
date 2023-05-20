const nodemailer = require("nodemailer");

const generateOtp = async function(req , res){
    console.log(req.body)
    var useremail = req.body.email;
      

    const data = Math.floor(Math.random() * 9000) + 1000;
    var otp = data.toString();
    console.log(otp)
    module.exports.otp = otp;
    console.log("genrateotp function otp",otp);

    //store time
    // const time = new Date();
    // const min = time.getMinutes()
    // console.log(min)
    // module.exports.min = min;

    //expire time
    function AddMinutesToDate(validDate, minutes) {
        var date = new Date(validDate);
        return new Date(date.getTime() + minutes*60000);
    }
    
    function DateFormat(validDate){
    var date = new Date(validDate);
     var days = date.getDate();
     var year = date.getFullYear();
     var month = (date.getMonth()+1);
     var hours = date.getHours();
     var minutes = date.getMinutes();
     minutes = minutes < 10 ? '0' + minutes : minutes;
     var strTime = days + '/' + month + '/' + year + '/ '+hours + ':' + minutes;
     //console.log(strTime)
     return strTime;
    }
    
    var now = new Date();
     var next = AddMinutesToDate(now,5);
    var expireTime = DateFormat(next)
    console.log(expireTime);
    module.exports.expireTime = expireTime;

    let testAccount = await nodemailer.createTestAccount();

    //sender email
    var senderEmail = 'testmail2416@gmail.com'
    //sender email password
    var userPassword = 'yvjeabbpxwugaokt'

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: senderEmail,
            pass: userPassword
        },
      })
      //user email address

      let info = await transporter.sendMail({
        from: `"Anuj Sahu" <${senderEmail}>`, // sender address
        to: useremail, // list of receivers
        subject: "OTP Verification", // Subject line
        text: `Enter the ${otp} to login in your web app this OTP is valid till next 5 minut`, // plain text body
        html: `Enter the <b>${otp}</b> to login in your web app this OTP is valid till next 5 minut`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send("OTP has been send to your email")
}



module.exports =  generateOtp;
