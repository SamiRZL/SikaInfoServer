const asyncHandler = require('express-async-handler')
const CustomError = require('../utils/customError')
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const validateToken = asyncHandler(async (req, res, next) => {

    const accessToken = req.cookies["access-token"]
    console.log(`Access token: ${accessToken}`)

    if (!accessToken) return next(new CustomError("User not authenticated or token expired", 400))

    try {
        const decoded = await jwt.verify(accessToken, process.env.SECRET_KEY)
        const { id, firstname, lastname } = await User.findById(decoded.id)
        req.currentUser = {
            id,
            firstname,
            lastname
        }
        return next()
    } catch {
        next(new CustomError("User is not authorized", 401))
    }

})




module.exports = { validateToken } 