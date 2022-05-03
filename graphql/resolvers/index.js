
const eventsResolver = require("./events.resolver")
const bookingsResolver = require("./bookings.resolver")
const authResolver = require("./auth.resolver")
module.exports = {
    ...eventsResolver,
    ...bookingsResolver,
    ...authResolver,
}