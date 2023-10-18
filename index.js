const express = require('express');
const app = express();
const mongoose = require('mongoose');
const loginFunctions = require('./mainJS/loginFunctions.js')
const pathFunctions = require('./mainJS/pathFunctions.js')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 4300;
// Set up view engine
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
require('dotenv').config();

// conenct to the database
const dbURI = process.env.DB_URL;
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    return res.render('index');
});

app.post('/api/sendVerificationEmail', loginFunctions.emailVerify);
app.post('/api/createAccount', loginFunctions.createAccount);
app.post('/api/loginAccount', loginFunctions.loginAccount);
// Render webpages
app.get('/signUp/:jwtToken', loginFunctions.sendSignUpPage);
app.get('/dashboard', loginFunctions.checkCookieForLogin, pathFunctions.renderDashboard);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});