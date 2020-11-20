'use strict'

import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  message: { type: String },
  name: { type: String },
}, {
  timestamps: true,
})

// indexes
userSchema.index({ createdAt: 1 })

userSchema.on('index',  (err) => {
  if (err) {
    console.log(err)
  }
})

module.exports = mongoose.model('Message', userSchema)
