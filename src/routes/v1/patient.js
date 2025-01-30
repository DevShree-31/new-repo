const express = require("express");

const verifyToken = require("../../middlewares/verifyCode");
const { patientController } = require("../../controllers");

const router = express.Router();

router.post('/patient',verifyToken,patientController.createPatient)
router.get('/patient',verifyToken,patientController.getAllPatients)
router.get('/patient/:email',verifyToken,patientController.getPatientById)
router.patch('/patient/:email',verifyToken,patientController.updatePatientById)
router.delete('/patient/:email',verifyToken,patientController.deletePatientById)
module.exports = router;
