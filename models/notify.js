const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
    message: {
        type: String,
        required: true
    },
    notified: {
        type: Boolean,
        required: true
    },
    date: { type: Date, default: Date.now }
});

exports.Notify = mongoose.model('notify', notifySchema);