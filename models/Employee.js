const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's Users.
const EmployeeSchema = new Schema({
    name:{
        type: String,
        required: true,  
    },
    email:{
        type: String,
        required: true,  
    },
    password:{
        type: String,
        required: true, 
    }
  } , {timestamps: true});

  mongoose.models = {}

  //creating User model
  const Employee = mongoose.model('User', EmployeeSchema);
  //exporting User model
  export default Employee;