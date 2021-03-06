const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required!'
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Chatroom', chatRoomSchema);