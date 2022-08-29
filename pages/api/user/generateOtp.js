import User from '../../../models/User'
import Otp from '../../../models/Otp'
import connectDb from '../../../middleware/connect'

const generate = (n)=>{
    var add = 1, max = 12 - add;  
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10;
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
            let user = await User.findOne({ email: req.body.email }).select("-password");
            if (!user) {
                return res.status(400).json({success:false, error: "Invalid email!" });
            }
            let otp = await Otp.create({
                userId: user._id,
                otp: generate(6),
            })
            res.status(200).json({success:true, otp : otp.otp });
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