import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            const { product } = await req.body;
            let user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            const cart = user.cart
            if(cart.length!=0){
                for(let i =0; i<cart.length; i++){
                    if(cart[i].productId==product){
                        if(cart[i].quantity>1){
                            cart[i].quantity = cart[i].quantity-1
                            break
                        }
                        else{
                            cart.splice(i,1)
                            break
                        }
                    }
                }
            }
            let updatedCart = await User.findByIdAndUpdate(req.userId, {cart:cart})
            return res.status(200).json({ success: true, cart:cart})
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