const mongoose = require('mongoose')



// 100,000      1 DOCUMENT  AUTHCODE.findOne({user_id: "blablah"}) O(1)
//Database Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },

    password: {
        type: String,
        required: true,
    },

    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events"
        }
    ]
}, {
    timestamps: true,
})




const Users = mongoose.model('Users', UserSchema)

module.exports = Users

