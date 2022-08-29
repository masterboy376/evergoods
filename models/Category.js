const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's orders.
const CategorySchema = new Schema({
    title:{
        type: String,
        required: true,  
    },
    img:{
        type: String,
        required: true,  
    }
  } , {timestamps: true});

  mongoose.models = {}

  //creating Order model
  const Category = mongoose.model('Category', CategorySchema);
  //exporting Order model
  export default Category;