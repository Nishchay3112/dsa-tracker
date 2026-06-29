const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const path = require('path');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');
dotenv.config();

const connect_to_db = require('./config/db');
const cookieParser = require('cookie-parser');
connect_to_db();

// builtin middlewares to process the req.body from the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cross origin resource sharing
const cors = require('cors');
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, server-to-server)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "https://my-dsa-tracker.vercel.app"
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, true); // 👈 TEMP FIX (important for Vercel preview URLs)
  },
  credentials: true
}));

// home page
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','home.html'));
})

app.use('/user',userRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server started successfully');
})