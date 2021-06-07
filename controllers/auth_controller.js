const bcrypt = require("bcryptjs");
const User = require("../models/User");
// const jwtGeneretor = require("../utils/jwtGeneretor");

exports.getAuthorization = (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}
//======================================================================================================================================================================================================================================================================================================================================================

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: 'Please Enter all fields!!',
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: 'User not found!',
            });
            return
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
            //Assign user object to session
            req.session.user = user;
            res.status(200).json({
                message: 'Successfu Login',
                user
            });
        } else {
            res.status(402).json({
                status: "fail",
                message: 'Incoreect email or password!',
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error...");
    }
}

exports.postRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(404).json({
                message: 'Please Enter all fields!!',
            });
        }
        if (password.length < 6) {
            res.status(404).json({
                message: 'Enter a pass with 6 characters!',
            });
        }
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(400).json({
                message: 'User already exists!',
            });
        } else {
            const newUser = new User({
                username, email, password
            });
            const hashPassword = await bcrypt.hash(password, 12);
            newUser.password = hashPassword;
            const registeredUser = await newUser.save();
            //Assign registeredUser object to session - login
            req.session.user = registeredUser;

            res.status(200).json({
                message: "Registration successful:)",
                registeredUser,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error...");
    }
}