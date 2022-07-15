// reference: https://youtu.be/41xodprx7z8
//     Gmail: autoconfirm.characters@gmail.com
//     Password: easypass123 



// Call this function when checkout is completed
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");
const {google} = require("googleapis");
// const { appengine } = require('googleapis/build/src/apis/appengine');
const config = require('../../frontend/src/config');
const {OAuth2} = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const {EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET} = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link);
auth.setCredentials({
    refresh_token: MAILING_REFRESH,
});

router.post('/', async (req, res) => {
    try{
        await sendReciept(req.body);
        res.sendStatus(200);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
  });


async function sendReciept(data) {
    try{
        console.log("sendReciept got this data:")
        console.log(data)

        const firstName = data.user.firstName;
        const email = data.user.email;
        const orderTotal = data.orderTotal;
        const orderNumber = data.orderNumber;
        const address = data.address;
        const orderDetailsURL = "http://localhost:3000/OrderDetails/" + orderNumber;
    

        const accessToken = await auth.getAccessToken();
        const stmp = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL,
                clientId: MAILING_ID,
                clientSecret: MAILING_SECRET,
                refreshToken: MAILING_REFRESH,
                accessToken: accessToken,
            },
        });
        const mailOptions={
            from: EMAIL,
            to: email,
            subject: "Characters Order Verification",
            //body of the email we want to send
            
            html: "<div style='padding:1vw 8vw 1vw 8vw'><h3>Order Confirmation</h3><p>Order #"+orderNumber+"</p><span>Hello "+firstName+",</span><div><span>Thank you for shopping with Characters, your support matters! Your order details are indicated below:</span><div style='border:1px solid #000;margin:1vw 10vw 1vw 10vw;padding:1rems 5vw 1rem 5vw'>Your order will be sent to:<br>"+address+"<br><br>Order total: $"+orderTotal+"<br><br><form action='"+orderDetailsURL+"'><input type='submit' value='View Order Details' /></form></div><span>We hope to see you again!</span></div></div>", 
        }
        await stmp.sendMail(mailOptions, (err, res)=>{
            if(err){
                console.log(err)
                return err;
            }
            return res;
        });

        return;
    }catch(error){
        console.log(error)
        return error
    }
}

module.exports = router;