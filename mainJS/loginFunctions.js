const mailFunctions = require('../mainJS/mailFunctions.js')
const jwt = require('jsonwebtoken');

function verifyJWTToken(token, secert) {
    if (token == null) return false

    try {
        return jwt.verify(token, secert)
    } catch (err) {
        // if err meaning that token is expired or is invalid 
        return false
    }
}

async function emailVerify(req, res) {
    if (typeof req.body.email !== "string") return res.status(400).send("No email was given to verify")
    let jwtToken = jwt.sign({ 'email': req.body.email }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "1h" });
    let link = process.env.SERVER_LINK + '/signUp/' + jwtToken;

    await mailFunctions.mailLink(req.body.email, link, [], 'Make your account by clicking the link');

    return res.send("Email sent!");
}

async function sendSignUpPage(req, res) {
    let jwtToken = req.params.jwtToken;
    if (jwtToken == undefined || jwt == null) return res.send("Sign up link is not valid");
    let decodedToken = verifyJWTToken(jwtToken, process.env.ACCESS_TOKEN_SECERT);
    console.log(decodedToken);
    if (!decodedToken) return res.send("Sign up link is invalid or has expired");
    return res.render('signUp', decodedToken)
}

async function createAccount() {

}


module.exports = {
    createAccount,
    emailVerify,
    sendSignUpPage
}