import jwt from 'jsonwebtoken'


const verifyUser = (req, res) => {
    const JWT_SECRET = process.env.JWT_SIGN;
    // Get the user from the jwt token and add id to req object
    const token = req.body.authToken;
    if (!token) {
        res.status(401).send({success:false, error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userId = data.user.id;
    } catch (error) {
        return res.status(401).send({success:false, error: "Please authenticate using a valid token" })
    }

}

export default verifyUser