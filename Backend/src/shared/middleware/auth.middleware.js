import jwt from "jsonwebtoken";
import User from "../../modules/auth/auth.model.js";

export const protect = async (req, res, next) => {
  let token;

  // Get token from header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
console.log(req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};


// Access Token → Authorization (Header)
// Refresh Token → Authentication Recovery (Cookie)