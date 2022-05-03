const Users = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
    login: async ({ email, password }) => {
        const user = await Users.findOne({ email: email })

        if (!user) {
            throw new Error("User Does Not Exist")
        }
        const isEqual = bcrypt.compareSync(password, user.password);

        if (!isEqual) {
            throw new Error("Invalid Credentials")
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email
        }, 'somesupersecretkey', {
            expiresIn: "1h"
        })


        return {
            userId: user._id,
            token,
            tokenExpiration: 1
        }


    },
    createUser: async (args) => {
        try {
            const userAlreadyExists = await Users.findOne({ email: args.userInput.email })
            if (userAlreadyExists) {
                throw new Error("User Already Exists")
            }
            const hashedPass = bcrypt.hashSync(args.userInput.password, 12)
            const user = new Users({
                email: args.userInput.email,
                password: hashedPass
            })

            const createdUser = await user.save()

            createdUser.password = null
            return createdUser;
        } catch (error) {
            throw error;
        }


    },

}