//this file is for user signup controller and validation
//this file is for user signup controller and validation
import User from "../model/userModel.js";
//validator used for validating email format and other inputs
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";



// User Signup ke liye controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Password hashing-it is a process of converting a plain text password into a secure format using a cryptographic algorithm.it helps protect user passwords from being easily accessed or compromised.
    let hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    let token = genToken(newUser._id);

    // Setting cookie-it is a small piece of data stored on the user's browser that helps remember information about the user and their preferences.
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",

      //age of cookie set to 7 days,it means cookie will expire after 7 days ,cookie is used for session management,authentication and personalization
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
// Additional controllers like login, logout can be added now

export const login = async (req, res) => {
  try {
    const {
      // req.body se hum email aur password nikal rahe hain
      email,
      password
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let token = genToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


export const logout = async (req, res) => {
    try {
        //to logout user ,we clear the token cookie
        await res.clearCookie("token");
        return res.status(200).json({message:"Logout successful"});
    }
        catch (error) {
        return res.status(500).json({message:"Server error",error:error.message});
    }
};

//to fetch these apis we have to create routes in routes folder and link them in index.js file