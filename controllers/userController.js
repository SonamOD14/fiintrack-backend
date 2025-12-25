const User = require("../models/UserModels");

const registerUser = async (req, res) => {

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "all field must fill"
      });
    }

    const user = await User.findOne({ where: { email: email } })
    if (user) {
      return res.status(400).json({
        message: "user already exists"
      })
    }

    const newUser = await User.create({
      username,
      email,
      password
    })

    return res.status(201).json({
      message: "user register successfully",
      user: newUser
    })

  } catch (error) {
    return res.json({
      message: "server error",
      error : error.message
    })
  }
}

module.exports = registerUser;
