import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'
import Order from '../../../models/Order'
import Product from '../../../models/Product'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            let user = await User.findById(req.userId).select("-password");
            let order={}
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let rawOrder = await Order.findById(req.body.orderId)
                    let product = await Product.findById(rawOrder.productId)
                    if (product) {
                        let newOrder = {
                            productDetails: product,
                            basicOrder: rawOrder
                        }
                        order=newOrder
                    }
            return res.status(200).json({ success: true, order})
        }
        catch (error) {
            res.status(500).json({ success: false, error: `Internal serer error occured!` });
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler