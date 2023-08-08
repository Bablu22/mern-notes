const mongoose = require("mongoose");

// Get the DB_USER and DB_PASS from environment variables
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// Check if DB_USER and DB_PASS are provided as environment variables
if (!DB_USER || !DB_PASS) {
  console.error("Please provide DB_USER and DB_PASS as environment variables.");
  process.exit(1); // Exit the application with an error code
}

// Construct the MongoDB URI with provided credentials
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.nvyrvu7.mongodb.net/notes`;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit the application with an error code
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
