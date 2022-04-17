import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb()
        try {
            //check whether the user with same email exist already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success:false, errors: "Please use different email, user with this email already exists" });
            }
            // crating a secure password
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);
            //create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
            })
            //creating data for authToken
            const data = {
                user: {
                    id: user.id
                }
            }
            //creating authToken
            const authToken = jwt.sign(data, process.env.JWT_SIGN);
            //sending auth token as a response
            res.status(200).json({success:true, authToken:authToken });
        }
        // this will return a error only if some internal server error occurs.
        catch (error) {
            res.status(500).json({sucess:false, error: `Internal serer error has occured!` });
        }
    }
    else {
        return res.status(400).json({ success: false, msg: 'Please make a valid request' })
    }
}

export default handler