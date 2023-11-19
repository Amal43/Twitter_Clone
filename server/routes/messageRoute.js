const express =require('express') ;
const messageController =require('../controllers/messageController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/uploadImage');
const router =express.Router();

router.route('/create')
            .post(messageController.createMsg);

router.route('/:conversationId')
            .get(messageController.getMsg);

module.exports= router;