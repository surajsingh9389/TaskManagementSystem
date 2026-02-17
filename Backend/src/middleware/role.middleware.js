// authenticate the user based on role 

export const authorize = (...roles) => {
  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role ${req.user?.role || "unknown"} is not authorized`
      })
    }

    next();
  }
}