import Order from '../../../models/Order'
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
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let order = await Order.findByIdAndDelete(req.body.orderId)
            return res.status(200).json({ success: true, order })
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