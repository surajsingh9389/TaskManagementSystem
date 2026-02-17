import jwt from 'jsonwebtoken';

export const auth = (req, res, next) =>{
    try {

        // Get token from header
        const header = req.headers.authorization;
        
        if(!header || !header.startsWith("Bearer ")){
            return res.status(401).json({message: "No token provided"});
        }
        const token = header.split(' ')[1];
        
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // passing {id, role}
        req.user = decoded
       
        // move to the controller
        next();
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({message: "Invalid or expired token"})
    }
}