import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import drugModel from "../models/drugModel.js";
import orderModel from "../models/orderModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
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

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const drugs = await drugModel.find({});
    const orders = await orderModel
      .find({})
      .populate("userId") // optional: get user details
      .populate("drugs.drugId");

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      drugs: drugs.length,
      orders: orders.length,
      latestAppointments: Array.isArray(appointments)
        ? appointments.slice(-5).reverse()
        : [],
      latestOrders: Array.isArray(orders) ? orders.slice(-5).reverse() : [],
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all drugs (admin)
const allDrugs = async (req, res) => {
  try {
    const drugs = await drugModel.find({});
    res.json({ success: true, drugs });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// adminController.js

const addDrugs = async (req, res) => {
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
    } = req.body;

    const imageFile = req.file; // multer handles the file

    // Validate required fields
    if (
      !name ||
      !category ||
      !manufacturer ||
      !price ||
      !description ||
      !expiryDate ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Save drug to DB
    const newDrug = new drugModel({
      name,
      category,
      manufacturer,
      price: Number(price),
      stock: Number(stock) || 0,
      description,
      prescriptionRequired:
        prescriptionRequired === "true" || prescriptionRequired === true,
      expiryDate,
      image: imageUrl,
      dateAdded: Date.now(),
    });

    await newDrug.save();

    res.json({ success: true, message: "Drug Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update drug (admin)
const updateDrugs = async (req, res) => {
  try {
    const { drugId, ...updateData } = req.body;
    await drugModel.findByIdAndUpdate(drugId, updateData);
    res.json({ success: true, message: "Drug Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete drug (admin)
const deleteDrugs = async (drugId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/delete-drug`, // admin route
      { drugId },
      { headers: { aToken } } // must be admin token
    );

    if (data.success) {
      toast.success(data.message);
      getAllDrugs(); // refresh list
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Get all orders (admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId") // populate user info
      .populate("drugs.drugId"); // populate drug info
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const order = await orderModel.findById(orderId).populate("drugs.drugId");
    if (!order) return res.json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    if (status === "completed") {
      for (let item of order.drugs) {
        if (item.drugId && item.quantity) {
          await drugModel.findByIdAndUpdate(item.drugId._id, {
            $inc: { stock: -item.quantity },
          });
        }
      }
    }

    res.json({ success: true, message: `Order marked as ${status}` });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  allDrugs,
  addDrugs,
  adminDashboard,
  updateDrugs,
  deleteDrugs,
  allOrders,
  updateOrderStatus,
};