import nc from "next-connect"
import bcrypt from "bcrypt"
import { validateEmail } from "../../../utils/validation"
import User from "../../../models/User"
import { createActivationToken, createResetToken } from "../../../utils/tokens"
import db from "../../../utils/db"
import { sendEmail } from "../../../utils/sendEmails"
import { resetEmailTemplate } from "../../../emails/resetEmailTemplate"

const handler = nc()

handler.post(async(req, res) => {
    try {
        await db.connectDb()
        const { email } = req.body
        const user = await User.findOne({ email })
        await db.disconnectDb()
        
        if(!user) {
            return res.status(400).json({message: "This email does not exist."})
        }

        const user_id = createResetToken({
            id: user._id.toString()
        })
        
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`

        sendEmail(email, url, "", "Reset your password.", resetEmailTemplate)
        res.json({message: "An email has been sent to you, use it to reset your password."})
    } catch (error) {
        
        console.log("debugging forgot", {email: req.body.email})

        res.status(500).json({ message: error.message })
    }
})

export default handler
