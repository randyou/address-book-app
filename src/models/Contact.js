'use strict'

import mongoose from 'mongoose'
import db from '../db/mongodb'

const Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  DOB: Number,
  address: String,
  email: String,
  createdAt: Number,
  updatedAt: Number,
  _owner: String
});

contactSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
});

contactSchema.pre('update', function (next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  next()
});

const Contact = db.model('Contact', contactSchema);

export default Contact
