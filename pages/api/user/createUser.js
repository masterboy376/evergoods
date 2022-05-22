import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success:false, error: "Please use different email, user with this email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
            })
            const data = {
                user: {
                    id: user._id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SIGN);
            res.status(200).json({success:true, authToken:authToken });
        }
        catch (error) {
            res.status(500).json({success:false, error: `Internal serer error has occured!` });
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler
