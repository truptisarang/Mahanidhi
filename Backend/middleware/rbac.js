const roleBasedAccess = (allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next(); // Proceed if user has the required role
    };
  };
  
  module.exports = roleBasedAccess;
  