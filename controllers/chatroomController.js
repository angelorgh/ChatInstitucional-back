const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const Message = mongoose.model('Message');
const User = mongoose.model('User');

exports.createChatroom = async (req, res) => {
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Chatroom name can contain only letters.";

    const chatroomExists = await Chatroom.findOne({name});

    if(chatroomExists) throw "Chatroom with that name already exists!";

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: "Chatroom created!"
    });
}

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}

exports.getChatroomMessages = async (req, res) => {
    const {id} = req.body;

    const chatroom = await Chatroom.findOne({_id: id})
    if (!chatroom) throw "Chatroom doesn't exist!"

    const messages = await Message.find({chatroom: id})

    res.json(messages)
}

exports.addUser = async (req, res) => {
    const {userId, chatroomId} = req.body;

    const chatroom = await Chatroom.findOne({_id: chatroomId})
    if (!chatroom) throw "Chatroom doesn't exist!";

    const user = await User.findOne({_id: userId})
    if (!user) throw "User doesn't exist!";
    
    if(chatroom.users.includes(user._id)) throw "User is already in Chatroom!";

    chatroom.users.push(user._id)
    chatroom.save();

    res.json({
        message: "User:" + user._id + " added to Chatroom: " + chatroom._id
    });
}

exports.removeUser = async (req, res) => {
    const {userId, chatroomId} = req.body;

    const chatroom = await Chatroom.findOne({_id: chatroomId})
    console.log(chatroom)
    if (!chatroom) throw "Chatroom doesn't exist!";

    const user = await User.findOne({_id: userId})
    if (!user) throw "User doesn't exist!";

    if(!chatroom.users.includes(user._id)) throw "User is not in Chatroom!";

    chatroom.updateOne({$pull: {users: user._id}}, function (err,data) {
        if (err) res.json({ 
            message: 'Failed to delete User from Chatroom',
          });
    });
    
    chatroom.save();

    res.json({
        message: "User: " + user._id + " removed from Chatroom: " + chatroom._id
    });
}


