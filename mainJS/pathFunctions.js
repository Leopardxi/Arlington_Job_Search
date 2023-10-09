const { verifyJWTToken, createJWTToken } = require('../mainJS/loginFunctions.js')

async function renderDashboard(req, res, next){
    // No need to check if user is logged in because of checkCookieForLogin middleware
    let decodedToken = verifyJWTToken(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECERT);

    return res.render('dashboard', {email: decodedToken.email});
}

module.exports = {
    renderDashboard
} 