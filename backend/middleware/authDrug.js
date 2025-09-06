import jwt from "jsonwebtoken";

// drug authentication middleware
const authDrug = async (req, res, next) => {
  const { drtoken } = req.headers;
  if (!drtoken) {
    return res.json({
      success: false,
      message: "Not Authorized. Please login again.",
    });
  }

  try {
    const token_decode = jwt.verify(drtoken, process.env.JWT_SECRET);
    req.body.drugId = token_decode.id; // save decoded drug id to request body
    next();
  } catch (error) {
    console.error("Drug Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authDrug;