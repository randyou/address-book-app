'use strict'

import crypto from 'crypto'

function md5(value) {
  const hash = crypto.createHash('md5');
  hash.update(value);
  return hash.digest('hex')
}

export default {
  md5
}
