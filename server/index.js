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

dotenv.config({ path: './config/.env' });

//middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Backend server running at Port ${process.env.PORT}`);
});
});