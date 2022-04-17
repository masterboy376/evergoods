import User from '../../../models/User'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    connectDb()
    try {
    let users = await User.find().select("-password")
    return res.status(200).json({ success: true, users })
    }
    catch (e) {
        return res.status(500).json({ success: false, msg: "internal server error occurred" })
    }
}

export default handler