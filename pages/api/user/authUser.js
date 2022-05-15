import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
    const { email, password } = await req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SIGN);
        res.json({success:true, authToken:authToken });

    }
    catch (error) {
        res.status(500).json({success:false, error: `Internal serer error occured!` });
    }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler