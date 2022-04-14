import mongoose from 'mongoose'

const connectDb = async (req,res)=>{
    try{
        if(!(mongoose.connections[0].readyState)){
            await mongoose.connect(process.env.MONGO_URI, ()=>{console.log('connected')})
        }
    }
    catch(error){
        return res.status(500).json({ success: false, msg: 'Faild! to establish connection' })
    }
}

export default connectDb