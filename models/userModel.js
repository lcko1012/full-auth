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
        default: ""
    }
})


module.exports = mongoose.model("Users", userSchema)