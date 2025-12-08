const authRizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "user role not authorized" });
    }
    next();
  };
};

module.exports = authRizeRoles;
