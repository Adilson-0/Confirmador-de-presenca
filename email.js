//função responsável por enviar o e-mail com a lista de presença

const nodemailer = require('nodemailer');
const {GMAIL_PASS} = require("./pass.json")
const dateObj = new Date();
var data = dateObj.getDate()+"/"+((dateObj.getMonth())+1)+"/"+dateObj.getFullYear();

const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'botlist739@gmail.com',
        pass: GMAIL_PASS
    }
});

var envEmail = async function (listText, listHtml){
    const info = await transport.sendMail({
        from:"BotList <botlist739@gmail.com>",
        to:"adilsonfernandes588@gmail.com",
        subject:"Lista de presença ("+data+")",
        text:listText,
        html:listHtml
    });
    console.log(info.messageId);
};

module.exports = envEmail;