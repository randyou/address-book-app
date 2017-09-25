'use strict'

import Sequelize from 'sequelize'
import config from '../config/mysql-config'

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

export default sequelize
