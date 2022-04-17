import jwt from 'jsonwebtoken'


const verifyUser = (req, res) => {
    const JWT_SECRET = process.env.JWT_SIGN;
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({success:false, error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({success:false, error: "Please authenticate using a valid token" })
    }

}

export default verifyUser