const router = require('express').Router();
const {catchErrors} = require('../handlers/errorHandler');
const userController = require('../controllers/userController');

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));
router.get("/chatrooms", catchErrors(userController.getChatrooms));


module.exports = router;

