require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

// Correct the relative path for the custom logger based on new structure
if (process.env.NODE_ENV === "development") {
  app.use(require("./utils/logger")); // Assuming logger is in the same backend directory
}

// Serve static files from the public/assets directory
app.use(express.static(path.join(__dirname, "../../public/assets")));

// Serve React built files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../dist")));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Update the require paths to reflect the new structure
require("./config/database");
app.use(require("./config/auth")); // for req.user all over the app

/* Routes */
// Update paths based on directory structure
app.use("/todos", require("./routes/todoRoute"));
app.use("/auth", require("./routes/userRoute"));

// Redirect all non-API requests to the React app in production
// This is important for supporting HTML5 history mode in React Router
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
