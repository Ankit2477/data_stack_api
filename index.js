const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
require("dotenv").config();
//
const authRoutes = require("./routs/authRoutes");
const userRoutes = require("./routs/userRoutes");
const propertyRoutes = require("./routs/propertyRoutes");
const propertyDetailRoutes = require("./routs/propertyDetailRoutes");
//  
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
dbConnect();
//middlewares

app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/props",authMiddleware, propertyRoutes);
app.use("/api/propDetails",authMiddleware, propertyDetailRoutes);

//server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server started in ${PORT}!`);
});
