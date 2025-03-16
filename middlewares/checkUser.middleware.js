import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Subscription_User from '../models/user.model.js';

dotenv.config();

const checkUser = async(req,res,next)=>{
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({message:'Unauthorized'});
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await Subscription_User.findById(decoded.userId);

        if(!user) return res.status(401).json({message:'Unauthorized'});
        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({message:'Unauthorized',error:error.message});
    }
}

export default checkUser;