const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Alarm', alarmSchema);
