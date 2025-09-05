// //import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // Admin Login Controller
// export const authAdmin = async (req, res , next) => {
//     try{
//        const {atoken} = req.headers 
//        if(!atoken) {return res.json({success:false,message:"Not Authorized Login again"})} 
//        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
//        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//         return res.json({success:false,message:"Not Authorized login again"})
//        }
//        next()
//     }catch (error) {
//         console.log(error)
//     res.json({success:false,message:error.message})
//     }

// }
    
// export default authAdmin 
import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    // ✅ Get token from Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    // Expect format "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if this is the correct admin
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized Login again" });
    }

    // All good → go to next middleware/controller
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;

