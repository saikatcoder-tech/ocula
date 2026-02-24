import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {
    try {
        let token;

        //check if authorization header exists
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            //Extract token
            token = req.headers.authorization.split(" ")[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Get user from database wihtout password
            req.user = await User.findById(decoded.id).select("-password");
            //move to next function
            next();
        } else {
            res.status(401).json({
                message: "Not authorized, no token"
            })
        }
    } catch (error) {
            res.status(401).json({
                message: error.message
            });
    }
};

export default protect;