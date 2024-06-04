
import jwt from "jsonwebtoken"

export const verifytoken = (req ,res , next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }

    jwt.verify(token , process.env.JWT_SECRET , async(err , payload) => {
        if(err) return res.status(401).json({ message: "token is not valid" });
        req.userId = payload.id

       next()
    })
}