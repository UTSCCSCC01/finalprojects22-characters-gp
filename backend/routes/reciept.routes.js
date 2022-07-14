// Call this function when checkout is completed
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const { appengine } = require('googleapis/build/src/apis/appengine');
const {OAuth2} = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const {EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET} = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link);
auth.setCredentials({
    refresh_token: MAILING_REFRESH,
});

router.post('/', async (req, res) => {
    await sendReciept(req.body);
    res.sendStatus(200);
  });


async function sendReciept(data) {
    try{
        const name = data.user.name;
        const email = data.user.email;
        const orderTotal = data.orderTotal;
        const orderNumber = data.orderNumber;
        const address = data.address;
    

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
            
            html: "<div>Order Confirmation<p>Order #"+orderNumber+" </p></div><div><span>Hello "+name+",</span><div><span>Thank you for shopping with Characters, your support matters! We will notiy you when your order is processed and shipped. Your order details are indicated below:</span><div style='border:1px solid #000;margin:1rems 5vw 1rem 5vw;padding:1rems 5vw 1rem 5vw'>Your order will be sent to:<br>"+address+"<br><br>Order total: $"+orderTotal+" </div><span>We hope to see you again!</span></div></div>", 
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