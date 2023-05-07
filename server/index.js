const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/database');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const multer = require('multer');
const path = require('path');

dotenv.config({ path: './config/.env' });

app.use('/images', express.static(path.join(__dirname, 'public/images')));

//middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename:(req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Backend server running at Port ${process.env.PORT}`);
});
});