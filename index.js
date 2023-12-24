const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const loginFunctions = require('./mainJS/loginFunctions.js')
const pathFunctions = require('./mainJS/pathFunctions.js')
const cookieParser = require('cookie-parser')
//https://solid-carnival-wpqwqjr66452prq-4300.app.github.dev/
const PORT = process.env.PORT || 4300;
// Set up view engine
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(express.static('css'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
require('dotenv').config();

// conenct to the database
const dbURI = process.env.DB_URL;
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    return res.render('homepage');
});

app.get('/api/approveAccount', loginFunctions.approveAccount);
app.post('/api/createAccount', loginFunctions.createAccount);
app.post('/api/loginAccount', loginFunctions.loginAccount);

/*app.post('/submit', async (req, res) => {
    loginFunctions.sendEmailToAdminForNewAccount(req, res);
});
*/

app.post('/api/sendEmailToAdminForNewAccount', loginFunctions.sendEmailToAdminForNewAccount);

// Render webpages
app.get('/signUp/:jwtToken', loginFunctions.sendSignUpPage);
app.get('/dashboard', loginFunctions.checkCookieForLogin, pathFunctions.renderDashboard);
app.get('/login', pathFunctions.renderLogin);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log( process.env.SERVER_LINK);
});
