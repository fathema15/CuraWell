// import validator from "validator"
// import bcrypt from "bcrypt"
// import { v2 as cloudinary} from "cloudinary"
// import doctorModel from "../models/doctorModel.js"
// import jwt from 'jsonwebtoken'
// //api for adding doc
// const addDoctor = async (req,res) => 
// { try {
//     const {name , email, password, specialty, degree, experience, about, fees, address } = req.body
//     const imageFile = req.file

//     if (!name || !email || !password|| !specialty|| !degree|| !experience|| !about|| !fees|| !address)
//        { return res.json({success:false,message:"Missing details"})}
//     //validating email formate
//     if (!validator.isEmail(email)) {
//         return res.json({success:false,message:"Please enter a valid email"})
//     }
//     if (password.length<8) {
//         return res.json({success:false, message:"please enter a strong password"})
//     //hashing doctor password    
//     }
//     const salt= await bcrypt.genSalt(10)
//     const hasedPassword = await bcrypt.hash(password,salt)

//     //upload image to cloudinary
//     const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
//     const imageUrl = imageUpload.secure_url
//     const doctorData={
//         name,
//         email, 
//         password:hasedPassword, 
//         specialty, 
//         degree, 
//         experience, 
//         about, 
//         fees, 
//         address:JSON.parse(address),
//         date:Date.now()
//     }
//     const newDoctor = new doctorModel(doctorData)
//     await newDoctor.save()

//     res.json({success:true,message:"Doctor Added"})
    
    

// } catch(error){
//     console.log(error)
//     res.json({success:false,message:error.message})
// } }

// //api for the admin login
// const loginAdmin = async(req,res) =>  {
//     try{
//         const {email,password}=req.body
//         if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
//          { const token = jwt.sign(email+password,process.env.JWT_SECRET)
//          res.json({success:true,token})
//          } else{ 
//             res.json({success:false,message:"Invalid credentials"})
//          }
//     }catch (error) {
//         console.log(error)
//     res.json({success:false,message:error.message})
//     }
// }

// export {addDoctor,loginAdmin}
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

// API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Check if all required fields are present
    if (
      !name ||
      !email ||
      !password ||
      !specialty ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash the doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    } else {
      return res.json({ success: false, message: "Image not provided" });
    }

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      specialty,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    // Save to database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin ,allDoctors};
