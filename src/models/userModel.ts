'use strict'

import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  email: {
    lowercase: true,
    trim: true,
    type: String,
  },
  name: { type: String, required: true },
  password: { type: String },
}, {
  timestamps: true,
})

// indexes
userSchema.index({ email: 1 })
userSchema.index({ createdAt: 1 })

userSchema.on('index',  (err) => {
  if (err) {
    console.log(err)
  }
})

module.exports = mongoose.model('User', userSchema)
