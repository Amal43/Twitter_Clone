const generateToken = require ('../utils/generateToken.js');

const attachCookiesToResponse = ({ res, user }) => {
    const token = generateToken({ payload: user });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
};

module.exports= attachCookiesToResponse;
