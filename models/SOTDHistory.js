const mongoose = require('mongoose');
const SOTD_History = new mongoose.Schema({
    guild_id: String,
    song_ID: String,
    date_announced: Date,
})

module.exports = mongoose.model("SOTDHistory",SOTD_History);