import Product from '../../../models/Product'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    connectDb(req,res)
    try {
    let products = await Product.find()
    return res.status(200).json({ success: true, products })
    }
    catch (e) {
        return res.status(500).json({ success: false, error: "internal server error occurred" })
    }
}

export default handler