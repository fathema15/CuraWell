import express from "express"
import { addDoctor,loginAdmin} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import { authAdmin } from "../controllers/authAdmin.js";


const adminRouter = express.Router()
adminRouter.post('/add-doctor',upload.single('image'), addDoctor)
adminRouter.post('/add-doctor', loginAdmin)
adminRouter.post('/login', authAdmin)

export default adminRouter
