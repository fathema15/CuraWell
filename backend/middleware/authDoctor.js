import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  const token = req.headers.dtoken || req.headers.dToken;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {}; // ensure req.body exists
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;