const express = require('express');
const router = express.Router();
const {
      getAllUser,
      updateUser,
      deleteUser,
      createNewUser
} = require('../controllers/userController')


router.route('/')
      .get(getAllUser)
      .post(createNewUser)
      .patch(updateUser)
      .delete(deleteUser)

module.exports = router