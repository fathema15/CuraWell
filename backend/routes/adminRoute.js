import express from "express";
import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
  allDrugs,
  addDrugs,
  updateDrugs,
  deleteDrugs,
} from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

// ----- Admin Auth -----
adminRouter.post("/login", loginAdmin);

// ----- Doctors -----
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", changeAvailability);

// ----- Appointments -----
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

// ----- Dashboard -----
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// ----- Drugs -----
adminRouter.get("/all-drugs", authAdmin, allDrugs);
adminRouter.post("/add-drug", authAdmin, upload.single("image"), addDrugs);
adminRouter.post("/update-drug", authAdmin, updateDrugs);
adminRouter.post("/delete-drug", authAdmin, deleteDrugs);

import { allOrders, updateOrderStatus } from "../controllers/adminController.js";

// Get all orders
adminRouter.get("/all-orders", authAdmin, allOrders);

// Update order status
adminRouter.post("/update-order-status", authAdmin, updateOrderStatus);


export default adminRouter;