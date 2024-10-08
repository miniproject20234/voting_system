const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;

const reguserShema = new schema({
    id: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId() },

    name: { type: String, required: [true, 'Please enter your name'], minlength: 3 },

    mobileNumber: {
        type: String, required: [true, 'Please enter your mobile number'], 
        minlength: [10, 'Minimum mobile number length is 10 digits'],
        maxlength: [10, 'Maximum mobile number length is 10 digits'],
        validate: [isMobilePhone, "Please enter a valid mobile number"]
    },

    aadharNumber: {
        type: String, 
        required: [true, 'Please enter an Aadhar number'],
        unique: true, // Ensures Aadhar numbers are unique
        validate: {
            validator: function(v) {
                return /^\d{12}$/.test(v); // Validates that Aadhar number is 12 digits
            },
            message: 'Aadhar number must be 12 digits'
        }
    },

    
    email: { 
        type: String, 
        required: [true, 'Please enter an email'], 
        lowercase: true, 
        validate: [isEmail, "Please enter a valid email"]  // Removed 'unique: true'
    },

    password: { 
        type: String, required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum password length is 6 characters'] 
    },

    photo: { type: String },  // Optional photo field

    isActive: { type: Boolean, default: true },

    isVerified: { type: Boolean, default: false },

    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' 
    }

}, {
    timestamps: true
});

// Hash password before saving to the database
reguserShema.pre('save', async function (next) {
    if (this.isModified('password')) {  // Only hash if the password is new or modified
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Static method to login user by id
reguserShema.statics.login = async function (id, password) {
    const user = await this.findOne({ id });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect ID');
};

const regUsers = mongoose.model('Registered_users', reguserShema);
module.exports = regUsers;
