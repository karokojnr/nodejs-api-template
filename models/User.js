const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;