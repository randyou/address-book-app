'use strict'

import User from './models/User'

const force = process.env.NODE_ENV = 'development' ? true : false

User.sync({ force: force })
