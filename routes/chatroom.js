const router = require('express').Router();
const {catchErrors} = require('../handlers/errorHandler');
const chatroomController = require('../controllers/chatroomController');

const auth = require('../middlewares/auth');

router.get("/", auth,catchErrors(chatroomController.getAllChatrooms));
router.get("/messages",auth, catchErrors(chatroomController.getChatroomMessages));
router.post("/", auth,catchErrors(chatroomController.createChatroom));
router.post("/addUser",auth,catchErrors(chatroomController.addUser));
router.post("/removeUser",auth,catchErrors(chatroomController.removeUser));

module.exports = router;

