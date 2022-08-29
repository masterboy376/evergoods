import Employee from '../../../models/Employee'
import connectDb from '../../../middleware/connect'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        try {
    const { email, password } = await req.body;
        let employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        const passwordCompare = await bcrypt.compare(password, employee.password);
        if (!passwordCompare) {
            return res.status(400).json({success:false, error: `Please try to login with the correct credentials.` });
        }
        const data = {
            Employee: {
                id: employee._id
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