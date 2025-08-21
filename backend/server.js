// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import adminRouter from './routes/adminRoute.js'
// //app config
// const app =express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()
// //middlewares
// app.use(express.json())
// app.use(cors())


// //api endpoint
// app.use('/api/admin',adminRouter)

// //localhost:4000 /api/admin

// app.get('/', (req, res) => {
//     res.send('API WORKING')
// })

// app.listen(port,()=> console.log("Server Started" ,port))
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

dotenv.config(); // Load .env

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admin', adminRouter);




app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Connect to Cloudinary
connectCloudinary()
  .then(() => console.log('✅ Cloudinary connected'))
  .catch(err => console.error('❌ Cloudinary connection error:', err));

// Start server safely
const server = app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});

// Handle EADDRINUSE gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please free it or use a different port.`);
    process.exit(1); // Exit the process so you can restart
  } else {
    console.error(err);
  }
});
