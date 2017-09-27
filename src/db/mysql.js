'use strict'

import Sequelize from 'sequelize'
import config from '../config/mysql-config'
let sequelize
if (!config.uri) {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  });
} else {
  sequelize = new Sequelize(config.uri)
}


sequelize.authenticate().then(() => {
  console.log("MySql connected ...");
}).catch((err) => {
  console.error(err);
  throw err;
});

export default sequelize
