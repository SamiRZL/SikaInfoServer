const User = require('../models/User');
const CustomError = require('../utils/customError');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');

const jwt = require('jsonwebtoken');


const { log } = require('console');


const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.isPasswordMatched(password))) {
            const accessToken = generateToken(user);
            res.cookie(
                'access_token', accessToken,
                {
                    maxAge: 24 * 60 * 60 * 1000,
                    domain: "https://sika-info-server.vercel.app",
                    sameSite: "none",
                    secure: true,
                    path: "/",
                    httpOnly: true,
                }
            );
            res.status(200).json({ message: 'User logged in successfully', data: user, token: accessToken });
        } else {
            return next(new CustomError('Invalid Credentials', 402));
        }
    } catch (err) {
        return next(new CustomError(err, 500));
    }
});

const logoutUser = asyncHandler(async (req, res, next) => {
    const objectId = new ObjectId(req.currentUser.id)

    try {
        const user = await User.findById(objectId);
        await res.clearCookie('access_token'); // Clear the access token cookie
        res.status(200).json({ message: 'User logged out successfully', user });
    } catch (error) {
        return next(new CustomError('Error during logout process', 500));
    }
});

const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email: email });
        if (!findUser) {
            try {
                const newUser = await User.create(req.body);
                const accessToken = generateToken(newUser);
                res.cookie(
                    'access_token', accessToken,
                    {
                        maxAge: 24 * 60 * 60 * 1000,
                        // httpOnly: true
                    }
                );
                res.status(200).json({ message: 'User successfully registered', data: newUser, token: accessToken });
            } catch (error) {
                return next(new CustomError(error.message, 500));
            }
        } else {
            return next(new CustomError('User with the same email is already registered', 400));
        }
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
});
const getUser = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.cookies);
        // Check if req.cookies is defined
        if (req.cookies && req.cookies.access_token) {
            // Token exists, attempt to decode it
            const accessToken = req.cookies.access_token;
            const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY);

            // If decoding succeeds, user is logged in
            if (decoded.id) {
                const user = await User.findById(decoded.id);
                return res.status(200).json({ isLoggedIn: true, user: user });
            }
        }

        // No token or decoding failed, user is not logged in
        return res.status(200).json({ isLoggedIn: false });
    } catch (error) {
        return next(new CustomError(error.message, 500));
    }
});


module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    getUser
}