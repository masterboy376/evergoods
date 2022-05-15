import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verifyUser(req, res)
        try {
            const { productId } = await req.body;
            let user = await User.findById(req.userId).select('wishlist');
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            const wishlist = user.wishlist
            if(wishlist.length==0){
                wishlist.push({
                    productId: productId,
                })
            }
            else{
                for (let i in wishlist) {
                    if (wishlist[i].productId == productId) {
                        return res.status(400).json({ success: false, error: `This item is already in your wishlist.` });
                    }
                    else if (i == wishlist.length - 1 && wishlist[i].productId != productId)
                        wishlist.push({
                            productId: productId,
                        })
                }
            }
            let updatedList = await User.findByIdAndUpdate(req.userId, { wishlist })
            return res.status(200).json({ success: true, wishlist })
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