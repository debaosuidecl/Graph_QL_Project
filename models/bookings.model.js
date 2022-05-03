const mongoose = require('mongoose')



// 100,000      1 DOCUMENT  AUTHCODE.findOne({user_id: "blablah"}) O(1)
//Database Schema
const BookingsSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },

}, {
    timestamps: true,
})




const Bookings = mongoose.model('Bookings', BookingsSchema)

module.exports = Bookings

