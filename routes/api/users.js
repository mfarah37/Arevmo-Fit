const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login)
// router.post('/set', usersCtrl.addSet)
router.get('/check-token', usersCtrl.checkToken) 
router.put('/update', usersCtrl.updateUser)
module.exports = router;
