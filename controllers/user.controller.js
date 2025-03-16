import mongoose from 'mongoose'
import Subscription_User from '../models/user.model.js'

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await Subscription_User.find();
        res.status(200).json({
            success:true,
            message:"List of all users",
            data:{
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async(req,res,next)=>{
    try {
        const user = await Subscription_User.findById(req.params.id).select('-password');
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success:true,
            message:"User Info",
            data:{
                user
            }
        })
    } catch (error) {
        next(error)
    }
}