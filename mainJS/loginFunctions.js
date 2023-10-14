const mailFunctions = require('../mainJS/mailFunctions.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schemas = require('../schemas/schema.js');

/*
    Verifies if the json web token passed in is correct or not
    If it's correct then returns the decoded token otheriwse it returns false

    String token -> token that needs to be checked
    String secert -> secert it to verify with to see if jwt is tampered with or not
*/
function verifyJWTToken(token, secert) {
    if (token == null) return false

    try {
        return jwt.verify(token, secert)
    } catch (err) {
        // if err meaning that token is expired or is invalid 
        return false
    }
}

/*
    Creates a new jwt token

    Object data ->
    String secert ->
    String expiresIn ->
*/
function createJWTToken(data, secert, expiresIn) {
    return jwt.sign(data, secert, { expiresIn: expiresIn })
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

    if (!decodedToken) return res.send("Sign up link is invalid or has expired");
    return res.render('signUp', { email: decodedToken.email, jwtToken: jwtToken })
}

async function createAccount(req, res) {
    let jwtToken = req.body.jwtToken;
    let email = req.body.email;
    let password = req.body.password;

    if (email == undefined || password == undefined) return res.status(400).send('Email or password cannot be empty');
    if (email == '' || password == '') return res.status(400).send('Email or password cannot be empty');
    if (jwtToken == undefined || jwt == null) return res.send("Sign up link is not valid");
   
    let decodedToken = verifyJWTToken(jwtToken, process.env.ACCESS_TOKEN_SECERT);
    if (email != decodedToken.email) return res.send("Sign up link is not valid");

    var user = await schemas.businessAccount.findOne({ 
        'userEmail': { $eq: email } 
    });

    if (user != null) return res.send("Email already in use");

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new schemas.businessAccount({
        "userEmail": email,
        "userPassword": hashedPassword,
        "formIntegration": {}
    });
    
    await newUser.save();
    return res.status(201).send("Done!!!");
}

async function loginAccount(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (email == undefined || password == undefined) return res.status(400).send('Email or password cannot be empty');
    if (email == '' || password == '') return res.status(400).send('Email or password cannot be empty');

    var user = await schemas.businessAccount.findOne({ 
        'userEmail': { $eq: email } 
    });

    if (user == null) return res.send("Email or password is incorrect");

    let isPasswordCorrect = bcrypt.compareSync(password, user.userPassword);
    if (!isPasswordCorrect) return res.send("Email or password is incorrect");

    res.cookie('accessToken', createJWTToken({ 'email': email }, process.env.ACCESS_TOKEN_SECERT, "30m"), { httpOnly: true, secure: true, sameSite: 'none' } )
    res.cookie('refreshToken', createJWTToken({ 'email': email }, process.env.REFRESH_TOKEN_SECERT, "30d"), { httpOnly: true, secure: true, sameSite: 'none' })
    return res.status(200).send("Done!!!");
}

function makeNewAccessToken(refreshToken){
    let decodedToken = verifyJWTToken(refreshToken, process.env.REFRESH_TOKEN_SECERT);
    if (decodedToken == false) return false;

    let newAccessToken = createJWTToken({email: decodedToken.email}, process.env.ACCESS_TOKEN_SECERT, '15m');
    return newAccessToken;
}

async function checkCookieForLogin(req, res, next){
    let accessToken = req.cookies.accessToken;
    let refreshToken = req.cookies.refreshToken;
    
    if (accessToken == undefined || accessToken == null) return res.redirect('/');

    let decodedToken = verifyJWTToken(accessToken, process.env.ACCESS_TOKEN_SECERT);
    if (decodedToken == false) {
        let newToken = makeNewAccessToken(refreshToken);
        res.cookie('accessToken', newToken, { httpOnly: true, secure: true, sameSite: 'none' });
        if (newToken == false){
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.send("You are not logged in. Please log in again");
        }
    }
    next();
}

module.exports = {
    createAccount,
    emailVerify,
    sendSignUpPage,
    verifyJWTToken,
    createJWTToken,
    checkCookieForLogin,
    loginAccount
}