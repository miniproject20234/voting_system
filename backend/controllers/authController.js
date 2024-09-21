const regUser = require("../model/regUser");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt=require("bcryptjs")


const nodemailer=require("nodemailer")
require('dotenv').config(); 


// JWT token creation
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: maxAge,
  });
};

//register post method
module.exports.register_post = async (req, res) => {
  const { username, email, password, phonenumber} = req.body;
  let errors = {};

  try {
    // Verify email using Hunter API
    const hunterApiKey = process.env.HUNTER_API_KEY;
    const hunterApiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`;
    const emailVerificationResponse = await axios.get(hunterApiUrl);

    if (emailVerificationResponse.data.data.result !== "deliverable") {
      errors.email = "It is not a valid Email";
      return res.status(400).json({ errors });
    }

    // Create user
    const reguser = await regUser.create({
      username,
      email,
      password,
      phonenumber,
    });
    const token = createToken(reguser._id);

    // console.log('Generated Token during Registration:', token);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
    });

    // Send the token in the response body as well
    res.status(201).json({ reguser: reguser._id, token });
  } catch (err) {
    if (err.code === 11000) {
      errors.email = "This email is already registered";
    } else if (err.message.includes("Reg_users validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    res.status(400).json({ errors });
  }
};


//login post method
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  let errors = {};

  try {
    const user = await regUser.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
    });
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    if (err.message === "incorrect email") {
      errors.email = "Email is not registered";
    } else if (err.message === "incorrect password") {
      errors.password = "Entered password is incorrect";
    } else {
      errors.general = "An unexpected error occurred";
    }
    res.status(400).json({ errors });
  }
};
//forgot password
module.exports.forgot_password = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await regUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ Status: "Please enter the registered email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '10m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password Link',
      text: `Link is valid for 10min only. Click the link below:
      http://localhost:3000/reset_password/${user._id}/${token}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ Status: "Success" });
    } catch (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ Status: "Error sending email", error: err.message });
    }
  } catch (err) {
    return res.status(500).json({ Status: "Error processing request", error: err.message });
  }
};


//reset password  
    
module.exports.reset_password= async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ Status: "Error with token" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await regUser.findByIdAndUpdate(id, { password: hashedPassword });

      res.status(200).json({ Status: "Success" });
    });
  } catch (err) {
    res.status(500).json({ Status: "Error resetting password", error: err.message });
  }
};

// Retrieve user details by email
module.exports.getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await regUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//update profile
module.exports.updateProfile = async (req, res) => {
  const { username, email, phonenumber } = req.body;
  const { id } = req.params;
  let errors = {};
  try {

    // Verify email using Hunter API
    const hunterApiKey = process.env.HUNTER_API_KEY;
    const hunterApiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`;
    const emailVerificationResponse = await axios.get(hunterApiUrl);

    if (emailVerificationResponse.data.data.result !== "deliverable") {
      errors.email = "It is not a valid Email";
      return res.status(400).json({ errors });
    }
    // Update user information
    const updatedUser = await regUser.findByIdAndUpdate(
      id,
      { username, email, phonenumber },
      { new: true, runValidators: true } 
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ updatedUser });
  } catch (err) {
    if (err.code === 11000) {
        errors.email = "This email is already exists";
        return res.status(400).json({ errors }); 
    }
    console.error(err);
    return res.status(500).json({ errors });
}

};



//verify password
module.exports.verify_password = async (req, res) => {
  const { password } = req.body; 
  try {
    const user = await regUser.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // 2. Compare the provided password with the stored password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    res.status(200).json({ message: 'Password verified successfully' });
    
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ message: 'Server error' });
  }
};