import User from '../../../models/User'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb()
        try {
        //Authenticate the user
    const { email, password } = await req.body;
        let user = await User.findOne({ email });//no need to write like {email: email} bcoz this is ES6
        //if user do not exists
        if (!user) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        //checkung the password 
        const passwordCompare = await bcrypt.compare(password, user.password);
        //if password is wrong
        if (!passwordCompare) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        //if password is correct then creating data for authToken
        const data = {
            user: {
                id: user.id
            }
        }
        //creating authToken
        const authToken = jwt.sign(data, process.env.JWT_SIGN);
        //sending auth token as a response
        res.json({success:true, authToken:authToken });

    }
    //this will return a error only if some internal server error occurs.
    catch (error) {
        res.status(500).json({success:false, error: `Internal serer error occured!` });
    }
    }
    else {
        return res.status(400).json({ success: false, msg: 'Please make a valid request' })
    }
}

export default handler