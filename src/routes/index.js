const express = require("express");

const v1Routes = require("./v1");
const patientRoutes=require('./v1/patient')
const router = express.Router();

router.use("/v1", v1Routes);
router.use('/v1',patientRoutes)
module.exports = router;
