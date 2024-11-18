const express = require('express');
const router = express.Router();
const {
      getAllUser,
      getUserById,
      getUserByName,
      updateUser,
      deleteUser,
} = require('../controllers/userController')


router.route('/')
      .get(getUserById)
      .patch(updateUser)
      .delete(deleteUser)
router.route('/all')
      .get(getAllUser)
router.route('/find')
      .get(getUserByName)
      
module.exports = router