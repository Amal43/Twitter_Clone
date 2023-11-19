const express =require('express') ;
const conController =require('../controllers/conController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/uploadImage');
const router =express.Router();

router.route('/create')
            .post(authMiddleware,conController.createCon);

router.route('/:userId')
            .get(conController.conversations);

module.exports= router;