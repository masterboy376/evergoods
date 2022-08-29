const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's orders.
const OtpSchema = new Schema({
    userId:{
        type: String,
        required: true,  
    },
    otp:{
        type: String,
        required: true,  
    },
    expiry:{
        type: Number,
        default: Date.now() + 600000,
    }
  } , {timestamps: true});

  mongoose.models = {}

  //creating Order model
  const Otp = mongoose.model('Otp', OtpSchema);
  //exporting Order model
  export default Otp;