const express = require("express");

const { InfoController, signUpController, paraController } = require("../../controllers");
const verifyToken = require("../../middlewares/verifyCode");

const router = express.Router();

router.get("/info", InfoController.info);
router.post("/signup",signUpController.signUp)
router.post("/signin",signUpController.signIn)
router.get('/para',verifyToken,paraController.contentController)
module.exports = router;
