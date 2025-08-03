export const processDonation = async(req,res) =>{
    try {
        const donationData = req.body
        if(!donationData.amount || !donationData.frequency || !donationData.donorInfo?.email){
          return res.status(400).json({
            error:"Missing required fields:amount,frequency,and donor email are required"
          })  
        }
        // dummy transaction testing
        const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(7)}`

        console.log('Donation received:', {
            transactionId,
            amount: donationData.amount,
            frequency: donationData.frequency,
            donor: donationData.donorInfo,
            paymentMethod: donationData.paymentMethod,
            timestamp: donationData.timestamp
        })

        res.status(200).json({ 
            message: 'Donation processed successfully',
            transactionId,
            amount: donationData.amount,
            frequency: donationData.frequency
        })

    } catch (error) {
        console.error('Donation processing error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}