const express = require("express");

const verifyToken = require("../../middlewares/verifyCode");
const { patientController } = require("../../controllers");

const router = express.Router();

router.post('/patient',verifyToken,patientController.createPatient)
router.get('/patient',verifyToken,patientController.getAllPatients)
router.get('/patient/:id',verifyToken,patientController.getPatientById)
module.exports = router;
