const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tokenSchema = new mongoose.Schema({
    email: { type: String, required: true, ref: 'User' },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;