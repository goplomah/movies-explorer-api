const router = require('express').Router();

const {
  // getUsers,
  // getUserById,
  updateProfile,
  // updateAvatar,
  getInfoCurrentUser,
} = require('../controllers/users');
const {
  // getUserByIdValidation,
  updateProfileValidation,
  // updateAvatarValidation
} = require('../middlewares/validationRoutes');

// router.get('/', getUsers);
router.get('/me', getInfoCurrentUser);
// router.get('/:_id', getUserByIdValidation, getUserById);
router.patch('/me', updateProfileValidation, updateProfile);
// router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
