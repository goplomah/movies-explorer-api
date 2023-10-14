const router = require('express').Router();

const {
  updateProfile,
  getInfoCurrentUser,
} = require('../controllers/users');
const {
  updateProfileValidation,
} = require('../middlewares/validationRoutes');

router.get('/me', getInfoCurrentUser);
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
