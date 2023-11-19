const express =require('express') ;
const userController =require('../controllers/userController');
const router =express.Router();
const upload = require('../middlewares/uploadImage');
const authMiddleware = require('../middlewares/auth');


router.route('/allUsers')
            .get(userController.getAllUsers);

router.route('/:id')
            .get(userController.getUser);

router.route('/update/:id')
            .put(
                    authMiddleware,
                    upload.fields([
                        {name:'imageUrl',maxCount: 1},
                        {name:'bgImageUrl',maxCount:1}
                    ]),
                    userController.updateUser
                );            

router.route('/follow/:id')
            .put(authMiddleware,userController.followUser);

router.route('/unfollow/:id')
            .put(authMiddleware,userController.unfollowUser);

router.route('/following')
            .get(authMiddleware,userController.getAllFollowing);

router.route('/followers')
            .get(authMiddleware,userController.getAllFollowers);
router.route('/delete/:id')
            .delete(userController.deleteUser);

module.exports= router;