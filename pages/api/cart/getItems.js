import User from '../../../models/User'
import Product from '../../../models/Product'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verifyUser(req, res)
        try {
            let user = await User.findById(req.userId).select("cart")
            let items = []
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            if (user.cart.length != 0) {
                for (let item of user.cart) {
                    let product = await Product.findById(item.productId)
                    if (product) {
                        let newProduct = {
                            productDetails: product,
                            quantity: item.quantity
                        }
                        items.push(newProduct)
                    }
                }
                
            }
            return res.status(200).json({ success: true, items })
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