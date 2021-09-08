const { Router } = require('express');
const usersController = require('../controllers/users.controller')

const router = Router();

router.route('/get-users').get(usersController.getUsers);
router.route('/create-user').post(usersController.createUser);
router.route('/delete-user/:id').delete(usersController.deleteUser);

module.exports = router;
