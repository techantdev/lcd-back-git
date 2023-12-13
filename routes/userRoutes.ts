const express = require("express");
const userController = require("./../controllers/user/userController");

const router = express.Router();

router.route("").get(userController.getUser);

module.exports = router;
