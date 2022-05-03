const Events = require("../../models/events.model")
const { transformBookings } = require("./merge.js")

const Bookings = require("../../models/bookings.model")

module.exports = {

    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not Authorized")
        }
        try {
            const bookings = await Bookings.find();
            return bookings.map(booking => (transformBookings(booking)))
        } catch (error) {
            throw error
        }
    },



    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not Authorized")
        }
        try {
            const fetchedEvent = await Events.findById(args.eventID);
            const booking = new Bookings({
                user: req.userId,
                event: fetchedEvent
            })
            const res = await booking.save();

            return transformBookings(res)
        } catch (error) {
            throw error
        }
    },

    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error("Not Authorized")
        }
        try {
            const booking = await Bookings.findById(args.bookingID).populate("event");
            if (!booking) {
                throw new Error("Booking does not exist")
            }
            const event = transformEvent(booking.event)
            const res = await Bookings.deleteOne({ _id: args.bookingID });
            return event
        } catch (error) {
            throw error
        }
    }
}