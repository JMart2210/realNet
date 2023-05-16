// Import the mongoose module
const mongoose = require("mongoose");

// Async function to connect to the MongoDB database using the connection string from the environment variables
const connectDB = async () => {
  try {
    // Attempt to connect to the database with mongoose.connect(), using the connection string from the environment variables.
    // Also passing in an options object to avoid deprecation warnings.
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true, // Use the new URL string parser instead of the deprecated one.
      useUnifiedTopology: true, // Use the new topology engine instead of the deprecated one.
    });

    // If the connection is successful, log a success message with the host of the connection.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If an error occurs during the connection attempt, log the error and exit the process with a failure code (1).
    console.error(err);
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
