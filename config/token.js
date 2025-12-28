import jwt from "jsonwebtoken";

const genToken = (user) => {
  try {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return token; // MOST IMPORTANT
  } catch (error) {
    console.log("JWT Error:", error);
  }
};

export default genToken;
