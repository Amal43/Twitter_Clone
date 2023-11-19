const express =require('express') ;
const postController =require('../controllers/postController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/uploadImage');
const router =express.Router();

router.route('/create')
            .post(authMiddleware,upload.single('postImage'),postController.createPost);

router.route('/posts')
            .get(postController.getAllPosts);

router.route('/:postId')
            .get(postController.getPostById);
            
router.route('/comment/:postId')
            .put(authMiddleware,postController.addComment);

router.route('/like/:postId')
            .put(authMiddleware,postController.like);

router.route('/unlike/:postId')
            .put(authMiddleware,postController.unLike);

module.exports= router;