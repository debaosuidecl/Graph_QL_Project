const Events = require("../../models/events.model")
const Users = require("../../models/user.model")
const { dateToString } = require("../../helper/date")
const DataLoader = require("dataloader")
const eventLoader = new DataLoader((eventIDs) => {
    return events(eventIDs)
})

const userLoader = new DataLoader((userIDs) => {
    return Users.find({ _id: { $in: userIDs } })
})
const events = async eventIDs => {
    try {
        const vals = await Events.find({ $in: eventIDs })
        return vals.map(val => {
            return transformEvent(val)
        })

    } catch (error) {
        throw error
    }
}
const user = async userId => {
    try {
        const val = await userLoader.load(userId.toString())
        return { ...val._doc, createdEvents: eventLoader.loadMany(val.createdEvents) }
    } catch (error) {
        throw error
    }
}
const singleEvent = async eventID => {
    try {
        const val = await eventLoader.load(eventID.toString())
        // const val = await Events.findById(eventID)
        // return transformEvent(val)
        return val
    } catch (error) {
        throw error
    }
}

const transformEvent = event => {
    return {
        ...event._doc,
        creator: user(event.creator),
        date: dateToString(event.date)
    };
}

const transformBookings = event => {
    return {
        ...event._doc,
        createdAt: dateToString(event.createdAt),
        updatedAt: dateToString(event.updatedAt),
        event: singleEvent(event.event),
        user: user(event.user),
    };
}


// exports.user = user;
module.exports = {
    transformBookings,
    transformEvent
}
// exports.events = events
// exports.singleEvent = singleEvent