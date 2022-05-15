import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verifyUser(req, res)
        try {
            const {productId} = req.body
            let user = await User.findById(req.userId).select("wishlist")
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let wishlist = user.wishlist
            for(let i = 0; i<wishlist.length; i++){
                if(wishlist[i].productId == productId){
                    wishlist.splice(i,1)
                    break
                }
            }
            let updatedList = await User.findByIdAndUpdate(req.userId, {wishlist})
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