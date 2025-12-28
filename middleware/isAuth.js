import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    // cookie se token nikal rahe hain
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied" });
    }

    // userId ko request me attach kar rahe hain
    req.user = verifyToken.userId;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default isAuth;
