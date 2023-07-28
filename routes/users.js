const router = require('express').Router();

const {
  updateProfile,
  // updateAvatar,
  getInfoCurrentUser,
} = require('../controllers/users');
const {
  updateProfileValidation,
  // updateAvatarValidation
} = require('../middlewares/validationRoutes');

router.get('/me', getInfoCurrentUser);
router.patch('/me', updateProfileValidation, updateProfile);
// router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
