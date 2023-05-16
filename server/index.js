// Import the required modules
const express = require('express'); // Express.js for creating the server
const app = express(); // Create an express application
const dotenv = require('dotenv'); // Module to load environment variables from .env file
const mongoose = require('mongoose'); // Mongoose for MongoDB interactions
const morgan = require('morgan'); // Morgan for logging HTTP requests
const helmet = require('helmet'); // Helmet for securing Express apps by setting various HTTP headers
const connectDB = require('./config/database'); // Import the function to connect to the database
const userRoute = require('./routes/users'); // User routes
const authRoute = require('./routes/auth'); // Auth routes
const postRoute = require('./routes/posts'); // Post routes
const multer = require('multer'); // Multer for handling multipart/form-data, which is used for file upload
const path = require('path'); // Node.js path module for handling and transforming file paths

// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Serve images statically from the 'public/images' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Use Morgan for logging HTTP requests
app.use(morgan('common'));

// Use Helmet for securing Express apps by setting various HTTP headers
app.use(helmet());

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images') // Set destination of uploaded files to 'public/images'
  },
  filename:(req, file, cb) => {
    cb(null, req.body.name) // Set filename of uploaded files to the 'name' field in the body of the request
  }
})

// Use multer middleware for file handling
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.error(error);
  }
});

// Use the routes from the routes modules
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Connect to the database and then start the server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Backend server running at Port ${process.env.PORT}`);
  });
});
