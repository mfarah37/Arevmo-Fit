const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const sessionSchema = require('./session').schema

const SALT_ROUNDS = 6 //6 is a reasonable value(hash) 

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  height: {
    type: String,
    default: ''
  },
  weight: {
    type: Number,
    default: 0
  },
  exerciseData: {
    type: Map,
    of:[ sessionSchema ]
  }
}, {
    timestamps: true,
    //Even though it's hashed -- dont serialize the password
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    // "this" is the user doc
    if (!this.isModified('password')) return next()
    //Update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next() 
})

module.exports = mongoose.model('User', userSchema)