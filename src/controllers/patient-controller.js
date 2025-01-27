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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while getting patient by id")
    }
}
async function updatePatientById(req,res){
    try {
        const id=req.params.id
        const {email}=req.user
        const updateData=req.body
        const patient=await db.Patients.findOne({
            where:{id}
        })

        if(!patient){
            return res.status(StatusCodes.BAD_REQUEST).json("Patient id not found")
        }
        if(patient.email!=email){
            return res.status(StatusCodes.UNAUTHORIZED).json("Unauthorized access to update")
        }
         const [updated] = await db.Patients.update(updateData, { where: {id} });
         if(updated){
            const updatedPatients = await db.Patients.findOne({ where: { id} });
      return res.status(StatusCodes.OK).json(updatedPatients); // Return the updated user data
         }
         else{
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found or no changes made' });
         }
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error while getting patient by id")
    }
}
async function deletePatientById(req,res){
  try {
    const id=req.params.id
        const {email}=req.user
        const patient=await db.Patients.findOne({
            where:{id}
        })
        if(!patient){
          return res.status(StatusCodes.BAD_REQUEST).json("Patient id not found")
      }
      if(patient.email!=email){
          return res.status(StatusCodes.UNAUTHORIZED).json("Unauthorized access to update")
      }
      const deletePatient=await db.Patients.destroy({
        where:{id}
      })
      return res.status(StatusCodes.ACCEPTED).json({
        message:"Patient deleted successfully",
        content:deletePatient
      })
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Cannot delete patient with the given id")
}
}
module.exports={createPatient,getAllPatients,getPatientById,updatePatientById,deletePatientById}