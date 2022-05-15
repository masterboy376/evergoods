const mongoose = require('mongoose');
const { Schema } = mongoose;

//creating a schema for user's orders.
const OrderSchema = new Schema({
    userId:{
        type: String,
        required: true,  
    },
    productId:{
        type: String,
        required: true,  
    },
    address:{
        type: String,
        required:true,
    },
    status:{
        type: String,
        default: 'Ordered', 
    },
    track:{
        type: String,
        default: 'N/A',
    },
    // price:{
    //     type:number,
    //     required: true,
    // },
    quantity:{
        type: Number,
        default: 1,
    }
  } , {timestamps: true});

  mongoose.models = {}

  //creating Order model
  const Order = mongoose.model('Order', OrderSchema);
  //exporting Order model
  export default Order;