const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers=  catchAsync( async (req, res,next) => {
    // Find all users
    // .scope('withSensitiveData') use this to get sensitive data
    const users = await User.findAll();
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})

exports.getUser =  (req, res) => {
    console.log('get All User router'); 
    res.status(200).json({message: 'get user'})
}