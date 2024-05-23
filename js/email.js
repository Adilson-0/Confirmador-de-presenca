const nodemailer = require('nodemailer');
const mailer = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:'botlist739@gmail.com',
        pass:'cbpe joge sogb eqfy'
    }
});

var envEmail = async function (){
    const email = await mailer.sendMail({
        from:"BotList <botlist739@gmail.com>",
        to:"jhonnatavieiravirginio@gmail.com",
        subject:"Lista de presença ("+data+")",
        text:"",
        html:""
    });
};

module.exports = envEmail;