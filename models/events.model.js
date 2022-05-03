const mongoose = require('mongoose')



// 100,000      1 DOCUMENT  AUTHCODE.findOne({user_id: "blablah"}) O(1)
//Database Schema
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
}, {
    timestamps: true,
})




const Events = mongoose.model('events', EventSchema)

module.exports = Events

