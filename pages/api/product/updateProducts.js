import Product from '../../../models/Product'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
            for (let i = 0; i < req.body.length; i++) {
                let product = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
            }
            return res.status(200).json({ success: true, items: req.body })
        }
        catch (e) {
            return res.status(500).json({ success: false, error: "internal server error occurred" })
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler