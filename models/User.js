import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please enter your full name."
    },
    email: {
        type: String,
        required: "Plese enter your email address.",
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: "Please enter a password."
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    defaultPaymentMethod: {
        type: String,
        default: ""
    },
    address : [
        {
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            zipCode: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            active: {
                type: Boolean,
                default: false
            }
        }
    ]
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;