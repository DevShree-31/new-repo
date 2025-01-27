const { StatusCodes } = require("http-status-codes")
const db = require("../models")
const {randomArray}=require('../config/test')
const { ValidationError } = require("sequelize")
async function contentController(req,res) {
    try {
        const {id}=req.user
    const roleName=await db.Role.findOne({
        where:{id}
    })
    if(!roleName){
        return res.status(StatusCodes.NOT_FOUND).json("Role Name not found")
    }
    if(roleName.name==="admin"){
        return res.status(StatusCodes.OK).json(randomArray)
    }
    else{
        return res.status(StatusCodes.OK).json(randomArray[0])
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
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Role access Error")
    }
    
}

module.exports={contentController}