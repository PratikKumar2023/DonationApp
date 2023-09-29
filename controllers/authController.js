const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    //validate
    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: 'Email exists already!',
      });
    }
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //res data to be saved
    const user = new userModel(req.body);
    await user.save();
    return res.status(200).send({
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error: All fields are required!',
    });
  }
};

//login call back
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    //validate
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Invalid Credentials!',
      });
    }
    //check role
    if(user.role !== req.body.role){
      return res.status(500).send({
        success: false,
        message: 'Role not matched!',
      });
    }
    //compare password
    const comparePassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: 'Invalid Credentials!',
      });
    }
    //Everything is alright
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.status(200).send({
      success: true,
      message: 'Login Successfully',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login API',
    });
  }
};

const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: 'User Fetched Successfully',
      user, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Unable to get Current User',
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
