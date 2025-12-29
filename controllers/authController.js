const User = require("../models/UserModels");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../helper/sendEmail");
const jwt = require("jsonwebtoken");
const emailVerifytemplate = require("../utils/emailtamplate/emailVerifytemplate");

const registerUser = async (req, res) => {

  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        message: "all field must fill"
      });
    }

    //search for samilar email
    const user = await User.findOne({ where: { email: email } })
    if (user) {
      return res.status(400).json({
        message: "user already exists"
      })
    }

    //generation verification 
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //verificationtoken expires time 
    const verificationTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    //fro hashing password
    const hashedPassword = bcrypt.hashSync(password, 10)


    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      TokenExpires: verificationTokenExpires
    })

    const verifyLink = `http://localhost:3000/api/user/verify-email?token=${verificationToken}`

    const html = emailVerifytemplate(verifyLink);

    await sendEmail(
      email,
      "verify your email address",
      html
    )

    return res.status(201).json({
      message: `user register successfully`,
      user: newUser
    })


  } catch (error) {
    return res.json({
      message: "server error",
      error: error.message
    })
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "all filed are require"
      });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({
        message: "email not found"
      });
    }

    const isMatch = bcrypt.compare(password, user.password)

    if (isMatch) {

      //jwt token generator
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN
        }
      );

      return res.status(201).json({
        message: "you are logged in",
        token: token
      });

    } else {
      return res.status(400).json({
        message: "email or password didn't match"
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: "server side error",
      error: error.message
    })
  }
}

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    //email khali chodnu banaya na 
    if (!email) {
      return res.status(400).json({
        message: "email is required"
      })
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({
        message: "user with this email does not exist"
      })
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    //Date.now() → current time  kena ke token should not live forever 
    const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.verificationToken = resetToken;
    user.TokenExpires = resetTokenExpires;
    await user.save();

    const resetLink = `http://localhost:3000/api/user/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Reset your password",
      `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      `
    );
    return res.status(200).json({
      message: "password reset link send to your email"
    })

  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message
    });
  }
}

module.exports = { registerUser, userLogin, forgetPassword };
