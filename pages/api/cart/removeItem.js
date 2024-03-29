import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            let user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let updatedCart = await User.findByIdAndUpdate(req.userId, {cart:[]})
            return res.status(200).json({ success: true, cart:[]})
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