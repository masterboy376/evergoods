import Category from '../../../models/Category'
import Employee from '../../../models/Employee'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            let employee = await Employee.findById(req.userId).select("-password");
            if (!employee) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let category = await Category.findByIdAndDelete(req.body.categoryId)
            return res.status(200).json({ success: true, category})
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