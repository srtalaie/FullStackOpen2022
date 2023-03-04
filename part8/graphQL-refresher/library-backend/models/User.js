const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 3,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	favoriteGenre: {
		type: String,
	},
})

const User = mongoose.model("User", userSchema)

module.exports = User
