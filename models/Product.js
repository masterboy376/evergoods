const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's Products.
const ProductSchema = new Schema({
    title:{
        type: String,
        required: true,  
    },
    description:{
        type: String,
        required: true,  
    },
    img:{
        type: String,
        required: true,  
    },
    slug:{
        type: String,
        required: true,  
        unique: true,
    },
    category:{
        type: String,
        required: true,
    },
    color:{
        type:String,
    },
    storage:{
        type:String,
    },
    price:{
        type:Number,
        required: true,
    },
    availableQty:{
        type:Number,
        required: true,
    },
  } , {timestamps: true});

  mongoose.models = {}

  //creating Product model
  const Product = mongoose.model('Product', ProductSchema);
  //exporting Product model
  export default Product;