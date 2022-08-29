import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'
import Product from '../../../models/Product'
import Order from '../../../models/Order'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            const { productId, address, quantity } = await req.body;
            let user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let product = await Product.findById(productId)
            if(!product){
                return res.status(400).json({ success: false, error: `product does not exist.` });
            }
            if(product.availableQty<quantity){
                return res.status(400).json({ success: false, error: `quantity is higher than available quantity.` });
            }
            let order = await Order.create({
                userId : req.userId,
                productId : productId,
                address : address,
                status : 'ordered',
                track : 'N/A',
                quantity : quantity
            })
            product = await Product.findByIdAndUpdate(productId, {availableQty:product.availableQty-quantity})
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