import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import Subscription_User from '../models/user.model.js';


dotenv.config();

export const signUp = async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name,email,password} = req.body;
        const existingUser = await Subscription_User.findOne({email});
        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await Subscription_User.create([{name,email,password:hashedPassword}],{session});

        const token = jwt.sign({userId:newUser[0]._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success:true,
            message:'User created successfully',
            data:{
                token,
                user:newUser[0]          
            } 
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error)
    }
}

export const signIn = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await Subscription_User.findOne({email});
        if(!user){
            const error = new Error("User does not exist");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            const error = new Error("Password is wrong");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message:'User signed in successfully',
            data:{
                token,
                user
            }
        })
    } catch (error) {
        next(error)
    }
}
