import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import drugModel from "../models/drugModel.js";

// API for admin login
const loginDrug = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await drugModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all drugs for frontend
const drugList = async (req, res) => {
  try {
    const drugs = await drugModel.find({});
    res.json({ success: true, drugs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to add a new drug
const addDrug = async (req, res) => {
  try {
    const {
      name,
      category,
      manufacturer,
      price,
      stock,
      description,
      prescriptionRequired,
      expiryDate,
      image,
    } = req.body;

    const newDrug = await drugModel.create({
      name,
      category,
      manufacturer,
      price,
      stock,
      description,
      prescriptionRequired,
      expiryDate,
      image,
    });

    res.json({ success: true, message: "Drug Added", newDrug });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update a drug
const updateDrug = async (req, res) => {
  try {
    const { drugId, ...updateData } = req.body;

    await drugModel.findByIdAndUpdate(drugId, updateData);

    res.json({ success: true, message: "Drug Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to delete a drug
const deleteDrug = async (req, res) => {
  try {
    const { drugId } = req.body;
    await drugModel.findByIdAndDelete(drugId);
    res.json({ success: true, message: "Drug Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to change stock
const changeStock = async (req, res) => {
  try {
    const { drugId, stock } = req.body;
    await drugModel.findByIdAndUpdate(drugId, { stock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginDrug, drugList, addDrug, updateDrug, deleteDrug, changeStock };