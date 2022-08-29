import Product from '../../../models/Product'
import Employee from '../../../models/Employee'
import connectDb from '../../../middleware/connect'
import verifyUser from '../../../middleware/verifyUser'

const generateSlug = (title, storage, color, size)=>{
let slug = '';
let arr;
if(title){
 slug = slug.concat(title.toLowerCase().replace(' ', '-'));
}
if(storage){
 slug = slug.concat('-'+storage.toLowerCase().replace(' ', '-'));
}
if(color){
 slug = slug.concat('-'+color.toLowerCase().replace(' ', '-'));
}
if(size){
 slug = slug.concat('-'+size.toLowerCase().replace(' ', '-'));
}
return slug
}

const handler = async (req, res) => {
    if (req.method == 'POST') {
        connectDb(req,res)
        verifyUser(req,res)
        try {
            let employee = await Employee.findById(req.userId).select("-password");
            if (!employee) {
                return res.status(400).json({ success: false, error: `Please try to login with the correct credentials.` });
            }
            let product = await Product.create({
                title : req.body.title,
                description : req.body.description,
                img: req.body.img,
                slug : generateSlug(req.body.title, req.body.storage, req.body.color, req.body.size),
                category: req.body.category,
                size: req.body.size,
                color: req.body.color,
                storage: req.body.storage,
                subCategory: req.body.subCategory,
                price: req.body.price,
                availableQty: req.body.availableQty
            })
            return res.status(200).json({ success: true, product})
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