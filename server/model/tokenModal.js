const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const token = mongoose.model("token", TokenSchema);

module.exports = token;