const express = require('express');
const router = express.Router();
const { Signup , loginUser} = require("../controllers/AuthController");

router.post("/signup", Signup);
router.post("/login", loginUser)


module.exports = router;
