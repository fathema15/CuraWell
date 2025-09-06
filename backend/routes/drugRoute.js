import express from "express";
import {
  loginDrug,
  drugList,
  addDrug,
  updateDrug,
  deleteDrug,
  changeStock,
} from "../controllers/drugController.js";
import authDrug from "../middleware/authDrug.js";

const drugRouter = express.Router();

// Login for drug manager
drugRouter.post("/login", loginDrug);

// Get all drugs (frontend)
drugRouter.get("/list", drugList);

// Add a new drug (admin/manager)
drugRouter.post("/add", authDrug, addDrug);

// Update drug
drugRouter.post("/update", authDrug, updateDrug);

// Delete drug
drugRouter.post("/delete", authDrug, deleteDrug);

// Change stock
drugRouter.post("/change-stock", authDrug, changeStock);

export default drugRouter;