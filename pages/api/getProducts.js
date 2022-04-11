import Product from '../../models/Product'
import connectDb from '../../middleware/connect'

const handler = async (req,res)=>{
    try{
        let products = await Product.find()
        return res.status(200).json({ success: true,products})
    }
    catch(e){
        return res.status(500).json({ success: false , msg: "internal server error occurred"})
    }
}

export default connectDb(handler)