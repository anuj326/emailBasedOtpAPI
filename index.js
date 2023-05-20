const express = require('express');
const generateOtp = require('./controllers/generateOtp');
const login = require('./controllers/login');
const  {loginRateLimiter} = require('./middleware/index')
const port = process.env.PORT || 8000;
const app = express();

app.use(
    express.urlencoded({ extended: true })
  );
app.use(loginRateLimiter)

app.get('/',function(req , res){
    res.send("Welcome to home page");
})

app.post('/generateOtp',generateOtp)

app.post('/login', login)



app.listen(port , function(err){
    if(err){
        console.log("something went wrong",err);
        return;
    }
    console.log("Express Server is running on port :",port)
})
