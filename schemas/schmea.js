const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessAccount = new Schema({
    "userEmail": {
        type: String,
        required: true
    }
    "userName": {
        type: String,
        required: true
    }
    "userPassword": {
        type: String,
        required: true
    },
    "formIntegration": {
        type: Object,
        required: true
    }
}, {timestamps: true}) 