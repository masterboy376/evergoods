import Employee from '../../../models/Employee'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req, res)
        verifyUser(req, res)
        try {
            let employee = await Employee.findById(req.userId).select("-password");
            if (!employee) {
                return res.status(400).json({ success: false, error: `incorrect auth token.` });
            }
            return res.status(200).json({ success: true, msg:"user verified" })
        }
        catch (e) {
            return res.status(500).json({ success: false, error: "internal server error occurred" })
        }
    }
    else {
        return res.status(400).json({ success: false, error: 'Please make a valid request' })
    }
}

export default handler