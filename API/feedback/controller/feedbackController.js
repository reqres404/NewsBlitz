import nodemailer from "nodemailer"

var transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "test_mail",
        pass: "requires application password not regular one"
    }
})

// Helper function to generate email subject based on feedback type
const generateEmailSubject = (feedbackType, category) => {
    const subjects = {
        suggestion: `NewsBlitz - New Suggestion: ${category}`,
        issue: `NewsBlitz - Issue Report: ${category}`,
        praise: `NewsBlitz - Positive Feedback: ${category}`
    }
    return subjects[feedbackType] || `NewsBlitz - Feedback: ${category}`
}

// Helper function to generate email body based on feedback type
const generateEmailBody = (feedbackData) => {
    const { feedbackType, category, name, email, message, rating, device } = feedbackData

    let body = `New ${feedbackType} feedback received from NewsBlitz app\n\n`
    body += `=== FEEDBACK DETAILS ===\n`
    body += `Type: ${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}\n`
    body += `Category: ${category}\n`
    body += `From: ${name || 'Anonymous'} (${email})\n`
    
    if (rating && feedbackType === 'praise') {
        body += `Rating: ${rating}/5 stars\n`
    }
    
    if (device && feedbackType === 'issue') {
        body += `Device/Browser: ${device}\n`
    }
    
    body += `\n=== MESSAGE ===\n${message}\n\n`
    body += `=== CONTACT INFO ===\n`
    body += `Email: ${email}\n`
    body += `Name: ${name || 'Not provided'}\n\n`
    body += `Timestamp: ${new Date().toISOString()}\n`
    body += `---\nSent from NewsBlitz Feedback System`

    return body
}

export const sendFeedback = async (req, res) => {
    try {
        const feedbackData = req.body

        // Validate required fields
        if (!feedbackData.feedbackType || !feedbackData.category || !feedbackData.message || !feedbackData.email) {
            return res.status(400).json({ 
                error: 'Missing required fields: feedbackType, category, message, and email are required' 
            })
        }

        const subject = generateEmailSubject(feedbackData.feedbackType, feedbackData.category)
        const body = generateEmailBody(feedbackData)

        var mailOptions = {
            from: "test_mail",
            to: "newsblitzz@gmail.com",
            subject: subject,
            text: body,
            html: `<pre style="font-family: Arial, sans-serif; line-height: 1.5;">${body}</pre>`
        }

        transpoter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error)
                res.status(400).json({ error: error.message })
            } else {
                console.log('Email sent successfully:', info.response)
                res.status(200).json({ 
                    message: `Feedback email sent successfully`,
                    type: feedbackData.feedbackType,
                    category: feedbackData.category
                })
            }
        })

    } catch (error) {
        console.error('Feedback processing error:', error)
        res.status(500).json({ error: error.message })
    }
}

