import nodemailer from "nodemailer"

var transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "app_mail",
        pass: "app_pass"
    }
})
console.log(process.env.EMAILPASS)
var mailOptions = {
    from:"adittyapatil89@gmail.com",
    to:"adittyapatil78@gmail.com",
    subject:"news blitz feedback",
    text:"this is feedback from newsblitz"
}

transpoter.sendMail(mailOptions,(error,info)=>{
    if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
})