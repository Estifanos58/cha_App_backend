const express = require('express');
const router = express.Router();
const {
      getAllUser,
      getUserById,
      updateUser,
      deleteUser,
} = require('../controllers/userController')


router.route('/')
      .get(getUserById)
      .patch(updateUser)
      .delete(deleteUser)
router.route('/all')
      .get(getAllUser)
      
module.exports = router