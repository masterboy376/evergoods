const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's Users.
const UserSchema = new Schema({
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
    },
    cart:[
        {
            productId:{
                type: String,
                required: true,
            },
            quantity:{
                type: Number,
                default: 1,
            }
        }
    ],
    wishlist:[
            {productId:{
                type: String,
                required: true,
                unique: true,
            }}
    ]
  } , {timestamps: true});

  mongoose.models = {}

  //creating User model
  const User = mongoose.model('User', UserSchema);
  //exporting User model
  export default User;