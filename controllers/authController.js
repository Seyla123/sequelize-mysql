
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const signToken = require('../utils/signToken');
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user : user.toSafeObject(),
        }
    })
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

exports.login =  catchAsync(async(req, res,next) => {
    const {email , password} = req.body
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400))
    }
    // .scope('withSensitiveData') use this to get sensitive data
    const user = await User.scope('withSensitiveData').findOne({where : {email : email}})

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user,201,res)
});
