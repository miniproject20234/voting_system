const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;

const reguserShema = new schema({
    username: { type: String, required: [true, 'Please enter an username'], minlength: 3 },

    email: { type: String, required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [isEmail, "please enter a valid email"] },

    phonenumber: {
        type: String, required: [true, 'Please enter an phonenumber'], minlength: [10, 'Minimum phonenumber length is 10 numbers'],
        maxlength: [10, 'Maximum phone number length is 10 numbers'],
        validate: [isMobilePhone, "Please enter a valid phone number"]
    },

    password: { type: String, required: [true, 'Please enter a password'], minlength: [6, 'Minimum password length is 6 characters'] },

   
     photo: { type: String }

}, {
    timestamps: true
});

// fire a function before doc saved to db  // pre refers to before
reguserShema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
//static method to login user

reguserShema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}





const regUsers = mongoose.model('Registered_users', reguserShema);
module.exports = regUsers;



// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     name: { type: String},
//     photo: { type: String },
//     password: { type: String },
//     // confirmPassword should not be part of the schema for existing users
//     // confirmPassword: { type: String } // Remove or comment this out if not needed for updates
// });

// module.exports = mongoose.model('Registered_users', userSchema);
