// reference: https://youtu.be/41xodprx7z8
//     Gmail: contactform.characters@gmail.com
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
        await sendEmail(req.body);
        res.sendStatus(200);
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
  });


async function sendEmail(data) {
    try{
        console.log("sendEmail got this data:");
        console.log(data);


        const email = "contactform.characters@gmail.com";

        const name = data.name;
        const message = data.message;
        const customerEmail = data.email;
    

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
            subject: name+" contacted Characters through the form",
            //body of the email we want to send
            html: name+" has the following email: "+customerEmail+" <br> "+name+" has left the following message: <br>"+message, 
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