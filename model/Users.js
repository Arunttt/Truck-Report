const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return !/\s/.test(v);
            },
            message: 'Username cannot contain spaces'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    jwtToken: {
        type: String,
        default: ''
    }
}, {
    collection: 'user',
    timestamps: false
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
};

UserSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    this.jwtToken = token;
    await this.save();
    return token;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
