import Product from '../../../models/Product'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb()
        try {
            for (let i = 0; i < req.body.length; i++) {
                let product = await Product.findByIdAndDelete(req.body[i]._id)
            }
            return res.status(200).json({ sucess: true, items: req.body })
        }
        catch (e) {
            return res.status(500).json({ success: false, msg: "internal server error occurred" })
        }
    }
    else {
        return res.status(400).json({ success: false, msg: 'Please make a valid request' })
    }
}

export default handler