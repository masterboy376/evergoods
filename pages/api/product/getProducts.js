import Product from '../../../models/Product'
import connectDb from '../../../middleware/connect'

const handler = async (req, res) => {
    connectDb()
    try {
    let products = await Product.find()
    let sortedProducts = {}
    for (let item of products) {
        console.log(item)
        if (item.title in sortedProducts) {
            if (!(sortedProducts[item.title].color).includes(item.color) && item.availableQty > 0) {
                sortedProducts[item.title].color.push(item.color)
                sortedProducts[item.title].img.push(item.img)
                sortedProducts[item.title].slug.push(item.slug)
            }
            if (!(sortedProducts[item.title].size).includes(item.size) && item.availableQty > 0) {
                sortedProducts[item.title].size.push(item.size)
            }
        }
        else {
            if (item.availableQty > 0) {
            sortedProducts[item.title] = await JSON.parse(JSON.stringify(item))
                console.log(sortedProducts)
                sortedProducts[item.title].color = [item.color]
                sortedProducts[item.title].size = [item.size]
                sortedProducts[item.title].img = [item.img]
                sortedProducts[item.title].slug = [item.slug]
            }
        }
    }
    return res.status(200).json({ success: true, sortedProducts })
    }
    catch (e) {
        return res.status(500).json({ success: false, msg: "internal server error occurred" })
    }
}

export default handler