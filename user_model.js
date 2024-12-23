// db schema - > property and data types

const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    // prop & types
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email id required.."],
        trim: true,
        unique: true,
        validate: {
            validator: (v) => {
                let regex = /^[a-zA-Z0-9_-\S]+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,10}$/;
                return regex.test(v)
            },
            message: props => `${props.value} is not a valid email id!..`
        }
    },
    age: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},{
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)