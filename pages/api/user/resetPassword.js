import User from '../../../models/User'
import Otp from '../../../models/Otp'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
    const { otp, password } = await req.body;
        let otpDetail = await Otp.findOne({ otp });
        if (!otpDetail) {
            return res.status(400).json({success:false, error: `Invalid otp.` });
        }
        if (Date.now()>otpDetail.expiry) {
            return res.status(400).json({success:false, error: `Otp expired.` });
        }
        let user = await User.findById(otpDetail.userId).select("-password");
        if (!user) {
            return res.status(400).json({success:false, error: `Invalid otp.` });
        }
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        user = await User.findByIdAndUpdate(otpDetail.userId, {password: securedPassword});

        const data = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SIGN);
        otpDetail = await Otp.findByIdAndDelete(otpDetail._id)
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