import Category from '../../../models/Category'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
        connectDb(req, res)
        try {
            let categories = await Category.find()
            return res.status(200).json({ success: true, categories })
        }
        catch (e) {
            return res.status(500).json({ success: false, error: "internal server error occurred" })
        }
}

export default handler