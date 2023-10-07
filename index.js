const express = require('express');
const app = express();
const mongoose = require('mongoose');
const loginFunctions = require('./mainJS/loginFunctions.js')

const PORT = process.env.PORT || 4300;
// Set up view engine
app.set('view engine', 'pug');
app.use(express.static('public'))
app.use(express.json())
require('dotenv').config();

// conenct to the database
const dbURI = process.env.DB_URL;
mongoose.set('strictQuery', false);
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    return res.render('index');
});

app.post('/api/sendVerificationEmail', loginFunctions.emailVerify);

// Render webpages
app.get('/signUp/:jwtToken', loginFunctions.sendSignUpPage);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});