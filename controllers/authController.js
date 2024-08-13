const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res,next) => {
    const newUser = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        passwordConfirm : req.body.passwordConfirm
    })
    const token = signToken(newUser.id);
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser.toSafeObject()
        }
    })
});

exports.login =  (req, res) => {
    console.log('get login router'); 
    res.status(200).json({message: 'get login'})
}
