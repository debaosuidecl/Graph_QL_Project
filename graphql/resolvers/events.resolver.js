const Events = require("../../models/events.model")
const Users = require("../../models/user.model")
const { transformEvent } = require("./merge.js")

module.exports = {
    events: async () => {
        let events = await Events.find();
        events = events.map(event => {
            return transformEvent(event)
        })
        return events

    },

    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not Authorized")
        }
        const event = new Events({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        })

        try {
            await event.save()
            await Users.findOneAndUpdate({
                _id: req.userId
            }, {
                $push: {
                    'createdEvents': event
                }
            }, {
                new: true
            })
            return transformEvent(event)

        } catch (error) {
            console.log(error);
            throw error
        }

    },




}