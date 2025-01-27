const express = require("express");

const verifyToken = require("../../middlewares/verifyCode");
const { patientController } = require("../../controllers");

const router = express.Router();

router.post('/patient',verifyToken,patientController.createPatient)
module.exports = router;
