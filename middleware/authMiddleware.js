const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "authorizaion denied" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
    console.log("The decode user is", req.user);
  } catch (error) {
    console.log("Error in auth middleware", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = verifyToken;
