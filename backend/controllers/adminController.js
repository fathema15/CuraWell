import validator from "validator"
import bycrypt from "bcrypt"
import { v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
//api for adding doc
const addDoctor = async (req,res) => 
{ try {
    const {name , email, password, specialty, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    if (name || !email || !password|| !specialty|| !degree|| !experience|| !about|| !fees|| !address)
       { return res.json({success:false,message:"Missing details"})}
    //validating email formate
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter a valid email"})
    }
    if (password.length<8) {
        return res.json({success:false, message:"please enter a strong password"})
    //hashing doctor password    
    }
    const salt= await bycrypt.genSalt(10)
    const hasedPassword = await bycrypt.hash(password,salt)

    //upload image to cloudinary
    const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl = imageUpload.secure_url
    const doctorData={
        name,
        email, 
        password, 
        specialty, 
        degree, 
        experience, 
        about, 
        fees, 
        address:JSON.parse(address),
        date:Date.now()
    }
    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({success:true,message:"Doctor Added"})
    
    

} catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
} }

//api for the admin login
const loginAdmin = async(req,res) =>  {
    try{
        const {email,password}=req.body
        if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
         { const token = jwt.sign(email+password,process.env.JWT_SECRET)
         res.json({success:true,token})
         } else{ 
            res.json({success:false,message:"Invalid credentials"})
         }
    }catch (error) {
        console.log(error)
    res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin}