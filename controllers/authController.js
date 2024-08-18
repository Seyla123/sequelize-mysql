const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const signToken = require("../utils/signToken");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op } = require("sequelize");
const sendMail = require("../utils/sendMail");

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',  // Secure in production
    httpOnly: true,
  };

  res.cookie('jwt', token, { httpOnly: true, secure: false});

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user.toSafeObject(),
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    // .scope('withSensitiveData') use this to get sensitive data
    const user = await User.scope("withSensitiveData").findOne({
        where: { email: email },
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  console.log('cookies :', req.cookies.jwt);
  
    // let token;
    // if (
    //   req.headers['authorization'] &&
    //   req.headers['authorization'].startsWith("Bearer")
    // ) {
    //     token = req.headers['authorization'].split(" ")[1];
    // }
    const token = req.cookies.jwt
    console.log("token :", token);
    if (!token) {
        return next(
            new AppError("You are not logged in! Please log in to get access", 401)
        );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log("decoded :", decoded);

    const currentUser = await User.findByPk(decoded.id);
    if (!currentUser) {
        return next(
            new AppError("The user belonging to this token does no longer exist", 401)
        );
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("User recently changed password! Please log in again", 401)
        );
    }

    req.user = currentUser;
    next();
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(!user){
        return next(new AppError('No user found with that email', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({
        fields: ["passwordResetToken", "passwordResetExpires"],
        validateBeforeSave: false,
    });

    // url for reset password
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
    // message for reset password
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you did not forget your password, please ignore this email!`;
    try {
        await sendMail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
            resetURL,
            userName : user.name
        })
        res.status(200).json({
            status: "success",
            resetToken,
        });
    } catch (error) {
        console.log(error);
        
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ fields: ["passwordResetToken", "passwordResetExpires"] });
        return next(new AppError("Error sending email. Please try again later.", 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        where: {
            passwordResetToken: hashedToken,
            passwordResetExpires: { [Op.gte]: Date.now() },
        },
    });

    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createSendToken(user, 200, res);
});
