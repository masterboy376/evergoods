import Product from '../../models/Product'
import connectDb from '../../middleware/connect'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let product = new Product({
                    title: req.body[i].title,
                    description: req.body[i].description,
                    img: req.body[i].img,
                    slug: req.body[i].slug,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    subCategory: req.body[i].subCategory,
                    storage: req.body[i].storage,
                    track: req.body[i].track,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                })
                await product.save()
            }
            return res.status(200).json({ sucess: true, items: req.body })
        }
        catch (e) {
            return res.status(500).json({ success: false, msg: "internal server error occurred" })
        }
    }
    else {
        return res.status(400).json({ success: false, msg: 'Please make a valid request' })
    }
}

export default connectDb(handler)