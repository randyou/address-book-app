'use strict'

import mongoose from 'mongoose'
import config from '../config/mongdb-config'

mongoose.Promise = global.Promise

const db = mongoose.createConnection(config.uri)


db.on('error', () => {
  console.error('Mongodb connection error ....')
  throw new Error('Mongodb connection error ....')
})

db.once('open', () => {
  console.log('Mongodb connected ...')
})

export default db
