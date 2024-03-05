const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUser

} = require('../controllers/UserController');

const { validateToken } = require('../middlewares/validateToken');

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);

router.get("/logoutUser", validateToken, logoutUser);
router.get("/loggedUser", getUser);

module.exports = router;