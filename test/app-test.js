'use strict'

import request from 'supertest'
import app from '../src/app'

describe('#test koa app', () => {
  let server
  let username
  let password = '123456'

  describe('#test server', () => {

    before(() => {
      server = app.listen(9900)
      username = 'test' + Date.now()
    })

    after(() => {
      server.close()
    })

    it('#test POST /auth/register/', async () => {
      let res = await request(server)
        .post('/auth/register/')
        .send({
          'username': username,
          'password': password
        })
        .set('Content-type', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(201)
    })

    let token
    it('#test POST /auth/accesstoken/', async () => {
      let res = await request(server)
        .post('/auth/accesstoken/')
        .send({
          'username': username,
          'password': password
        })
        .set('Content-type', 'application/json')
        .expect('Content-Type', /application\/json/)
        .expect(200)
      token = res.body.token
    })

    it('#test Unauthorized GET /api/v1/contacts/', async () => {
      let res = await request(server)
        .get('/api/v1/contacts/')
        .expect(401)
    })

    it('#test GET /api/v1/contacts/', async () => {
      let res = await request(server)
        .get('/api/v1/contacts/')
        .set('Authorization', token)
        .expect('Content-Type', /application\/json/)
        .expect(200)
    })

    const now = Date.now()
    const address = '137 W San Bernardino Rd.'
    const email = 'test@test.com'
    it('#test Unauthorized POST /api/v1/contacts/', async () => {
      let res = await request(server)
        .post('/api/v1/contacts/')
        .send({
          'name': 'Jack Ma',
          'DOB': now,
          address: address,
          email: email,
        })
        .expect(401)
    })

    let contactId
    it('#test POST /api/v1/contacts/', async () => {
      let res = await request(server)
        .post('/api/v1/contacts/')
        .send({
          name: 'Jack Ma',
          DOB: now,
          address: address,
          email: email,
        })
        .set('Authorization', token)
        .expect('Content-Type', /application\/json/)
        .expect(201)
      contactId = res.body.data._id
    })

    it('#test Unauthorized GET /api/v1/contacts/:id', async () => {
      let res = await request(server)
        .get('/api/v1/contacts/' + contactId)
        .expect(401)
    })

    it('#test GET /api/v1/contacts/:id', async () => {
      let res = await request(server)
        .get('/api/v1/contacts/' + contactId)
        .set('Authorization', token)
        .expect('Content-Type', /application\/json/)
        .expect(200)
    })

    it('#test PATCH /api/v1/contacts/:id', async () => {
      let res = await request(server)
        .patch('/api/v1/contacts/' + contactId)
        .send({
          name: 'Jackson Ma'
        })
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', /application\/json/)
        .expect(201)
    })

    it('#test Unauthorized DELETE /api/v1/contacts/:id', async () => {
      let res = await request(server)
        .delete('/api/v1/contacts/' + contactId)
        .expect(401)
    })

    it('#test DELETE /api/v1/contacts/:id', async () => {
      let res = await request(server)
        .delete('/api/v1/contacts/' + contactId)
        .set('Authorization', token)
        .expect(204)
    })

  })
})

