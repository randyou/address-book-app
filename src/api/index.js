'use strict'

import fs from 'fs'
import Router from 'koa-router'
import path from 'path'

import permission from '../auth/permission'

const router = new Router()

function requireApi(dir) {
  const files = fs.readdirSync(path.join(__dirname, dir));

  let js_files = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (let f of js_files) {
    let map = require(path.join(__dirname, dir, f));
    addRoute(map);
  }
}

function addRoute(map) {
  if (map) {
    for (let url in map) {
      console.log(`Add route ${url}`);
      if (url.startsWith('GET ')) {
        let path = url.substring(4);
        router.get(path, permission(), map[url]);
      } else if (url.startsWith('POST ')) {
        let path = url.substring(5);
        router.post(path, permission(), map[url]);
      } else if (url.startsWith('PUT ')) {
        let path = url.substring(4);
        router.put(path, permission(), map[url]);
      } else if (url.startsWith('PATCH ')) {
        let path = url.substring(6);
        router.patch(path, permission(), map[url]);
      } else if (url.startsWith('DELETE ')) {
        let path = url.substring(7);
        router.delete(path, permission(), map[url]);
      } else {
        console.log(`Invalid url: ${url}`);
      }
    }
  }
}

export default (dir = 'v1') => {
  requireApi(dir)
  return router.routes()
}
