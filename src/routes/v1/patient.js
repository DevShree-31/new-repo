const express = require("express");

const verifyToken = require("../../middlewares/verifyCode");
const { patientController } = require("../../controllers");

const router = express.Router();

router.post('/patient',verifyToken,patientController.createPatient)
router.get('/patient',verifyToken,patientController.getAllPatients)
router.get('/patient/:id',verifyToken,patientController.getPatientById)
router.patch('/patient/:id',verifyToken,patientController.updatePatientById)
router.delete('/patient/:id',verifyToken,patientController.deletePatientById)
module.exports = router;
