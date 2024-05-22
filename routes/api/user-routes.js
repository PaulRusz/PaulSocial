const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    // extra work to add friend or delete friend from users friend list
    addFriend,
    deleteFriend
} = require('../..controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// extra
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;