const { StatusCodes } = require("http-status-codes")
const db = require("../models")
const { ValidationError } = require("sequelize")

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

module.exports={createPatient}