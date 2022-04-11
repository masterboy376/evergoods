import mongoose from 'mongoose'

const connectDb = handler => async (req,res)=>{
    try{
        if(!(mongoose.connections[0].readyState)){
            await mongoose.connect(process.env.MONGO_URI, ()=>{console.log('connected')})
            return handler(req, res)
        }
    }
    catch(error){
        
    }
}

export default connectDb