'use strict'

const config = {
  database: process.env.MYSQL_DB_NAME || 'addressBook',
  username: process.env.MYSQL_U || 'www',
  password: process.env.MYSQL_P || 'www',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306
};

export default config
