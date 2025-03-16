import nodemailer from "nodemailer"

var transpoter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "test_mail",
        pass: "requires application password not regular one"
    }
})

export const sendFeedback =async(req,res)=>{
    try {
        const feedbackData = await req.body

        var mailOptions = {
            from:"test_mail",
            to:"test_mail",
            subject:"news blitz feedback",
            text: feedbackData.data
        }
        transpoter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                res.status(400).json({error:error.message})
              } else {
                res.status(200).json({message:`mail sent : ${info.response}`})
              }
        })        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

