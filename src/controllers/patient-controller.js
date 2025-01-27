const { StatusCodes } = require("http-status-codes")
const db = require("../models")
const { ValidationError, where } = require("sequelize")

async function createPatient(req,res) { 
    try {
        const {name,email,number,gender}=req.body
        if(!name||!email||!number||!gender){
            return res.status(StatusCodes.BAD_REQUEST).json("Please fill all the details")
        }
        const user=await db.Patients.findOne({
                where:{email}
            })
            if(user){
                return res.status(StatusCodes.BAD_REQUEST).json("Patient already present")
            }
        const patient=await db.Patients.create({
                name,
                email,
                number,
                gender
            })
    
        return res.status(StatusCodes.CREATED).json(patient) 
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors
            console.error('Validation Errors:');
            error.errors.forEach((err) => {
              console.error(`${err.path}: ${err.message}`);
            });
          } else {
            console.error('Error: while', error);
          }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while registering a user")
    }
    
}

async function getAllPatients(req,res) {
    try {
        const patients=await db.Patients.findAll()
        return res.status(StatusCodes.OK).json(patients)
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors
            console.error('Validation Errors:');
            error.errors.forEach((err) => {
              console.error(`${err.path}: ${err.message}`);
            });
          } else {
            console.error('Error: while', error);
          }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while getting all patients")
    }
}
async function getPatientById(req,res){
    try {
        const {id}=req.params
        const patient=await db.Patients.findOne({
            where:{id}
        })
        if(!patient){
            return res.status(StatusCodes.BAD_REQUEST).json("patient with this id does not exist")
        }
        return res.status(StatusCodes.OK).json(patient)
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors
            console.error('Validation Errors:');
            error.errors.forEach((err) => {
              console.error(`${err.path}: ${err.message}`);
            });
          } else {
            console.error('Error: while', error);
          }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while getting atient by id")
    }
}
async function updatePatientById(req,res){
    
}
module.exports={createPatient,getAllPatients,getPatientById}