const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    role: {
        type: Number,
        dafault: 0 // 0 = user, 1 = admin
    },

    avatar: {
        type: String,
        default: "https://res.cloudinary.com/bach-khoa-da-nang/image/upload/v1613827580/avatar/download_giqx2b.jpg"
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Users", userSchema)