import jwt from "jsonwebtoken"

export const userAuth = async (req, res, next)=>{
    const { token } = req.headers;

    if(!token){
        return res.json({success: false, message: "Not Authorized Login Again"})
    }
    try {
        const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decode_token.id;
        next();
    } catch (error) {
        res.json({success: false, message: "Not Authorized Login Again"})
    }
}

