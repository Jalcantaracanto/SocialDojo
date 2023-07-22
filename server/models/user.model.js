const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            minlength: [3, 'Username must be at least 3 characters long'],
        },
        password: {
            type: String,
            require: [true, 'Password is required'],
        },
        firstname: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required'],
        },
        email: {
            type: String,
            // required: [true, 'Email is required'],
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: 'Please enter a valid email',
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        city: String,
        from: String,
        relationship: String,
        followers: [],
        followings: [],
    },
    { timestamps: true }
)

const User = model('User', UserSchema)

module.exports = User
