const { request } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || request.header.Authorization;
    if (!authHeader?.startWith('Bearre')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.Userinfo.username;
            req.roles = decoded.Userinfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT