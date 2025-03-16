import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Username is required'],
        unique:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        minLength:3,
        maxLength:50,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:6
    }  
}, { timestamps: true });

const Subscription_User = mongoose.model('Subscription_User',userSchema);

export default Subscription_User