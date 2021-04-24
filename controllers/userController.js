const mongoose = require("mongoose");
const User = mongoose.model("User");
const Chatroom = mongoose.model("Chatroom")
const sha256 = require('js-sha256');
const jwt = require('jwt-then');

exports.register = async(req, res) => {
    const {name, email, password} = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    
    if(!emailRegex.test(email)) throw "Email is not supported from your domain";
    if(password.length < 6) throw "Password must be alteast 6 characters long";

    const userExists = await User.findOne({
        email,
    });

    if(userExists) throw "User with same email already exists.";

    const user = new User({
        name, 
        email, 
        password: sha256(password + process.env.SALT)
    });

    await user.save();

    res.json({
        message: "User [" + name + "] registered sucessfully!"
    })
};

exports.login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email, 
        password: sha256(password + process.env.SALT)
    });

    if(!user) throw "Email and Password did not match.";

    const token  = await jwt.sign({id: user.id}, process.env.SECRET);

    res.json({
        message: "User logged in succesfully!",
        token,
    });
}

exports.getChatrooms = async(req,res) => {
    const {id} = req.body;

    const userExists = await User.findOne({_id: id});
    if(!userExists) throw "User doesn't exist!";

    const chatrooms = await Chatroom.find({users: userExists._id});
    
    res.json(chatrooms);
}
