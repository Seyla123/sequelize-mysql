const User = require('../models/userModel');
const MyUser = require('../models/myuser');
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

exports.tesing =  catchAsync(async(req, res) => {
    
    try {
        console.log('cookieees : ', req.cookies.jwt);
        console.log('get All User sasd  router');
        res.cookie('test', 'anything',{ httpOnly: true, secure: false })
     const myUser = await MyUser.findAll();
    // console.log('myUser :', myUser);
     
    res.status(200).json({message: 'get user',myUser})
    } catch (error) {
        console.log(error);
        
    }
})