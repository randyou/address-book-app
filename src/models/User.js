'use strict'

import Sequelize from 'sequelize'
import mysql from '../db/mysql'

const User = mysql.define('user', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(100),
    unique: true
  },
  password: Sequelize.STRING(100),
  createdAt: Sequelize.BIGINT,
  updatedAt: Sequelize.BIGINT
},
  {
    timestamps: false
  })

export default User
