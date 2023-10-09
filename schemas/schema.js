const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessAccountSchema = new Schema({
    "userEmail": {
        type: String,
        required: true
    },
    "userName": {
        type: String,
    },
    "userPassword": {
        type: String,
        required: true
    },
    "formIntegration": {
        type: Object,
        required: true
    }
}, {timestamps: true}) 


const businessAccount = mongoose.model('businessAccounts', businessAccountSchema);

module.exports = {
    businessAccount
}