'use strict'

import Contact from '../../models/Contact'

const formatBody = (body, obj) => {
  const { name, DOB, address, email } = body
  name && (obj.name = name)
  DOB && (obj.DOB = DOB)
  address && (obj.address = address)
  email && (obj.email = email)
}

/**
 * Get contact list.
 *
 * @param {any} ctx
 * @param {any} next
 */
const getContacts = async (ctx, next) => {
  const { limit = 1000, offset = 0, sort = '_id' } = ctx.request.query
  const user = ctx.req.user
  const total = await Contact.where({ _owner: user.id }).count().exec()
  const contacts = await Contact.find({ _owner: user.id }).skip(parseInt(offset)).limit(parseInt(limit)).sort(sort).exec()
  ctx.rest({
    success: true,
    total: total,
    offset: offset,
    data: contacts
  })
}

/**
 * Get contact by id
 *
 * @param {any} ctx
 * @param {any} next
 */
const getContactById = async (ctx, next) => {
  const id = ctx.params.id
  const user = ctx.req.user
  const contact = await Contact.findOne({ _id: id }).exec()
  if (!contact) {
    ctx.throw(404)
  }
  if (contact._owner !== user.id) {
    ctx.throw(403)
  }
  ctx.rest({
    success: true,
    data: contact
  })
}

/**
 * Create a contact.
 *
 * @param {any} ctx
 * @param {any} next
 */
const createContact = async (ctx, next) => {
  const user = ctx.req.user
  const obj = {
    _owner: user.id,
    createdAt: Date.now()
  }
  formatBody(ctx.request.body, obj)
  if (obj.name) {
    try {
      const contact = new Contact(obj)
      const ret = await contact.save()
      ctx.status = 201
      ctx.rest({
        success: true,
        data: ret
      })
    } catch (error) {
      console.error(error)
      ctx.throw(500)
    }
  } else {
    ctx.status = 400
    ctx.body = {
      error: 'Name is required'
    }
    return
  }
}

/**
 * Delete contact.
 *
 * @param {any} ctx
 * @param {any} next
 */
const deleteContact = async (ctx, next) => {
  const id = ctx.params.id
  if (id.length != 24) {
    ctx.status = 404
    return
  }
  const user = ctx.req.user
  try {
    const contact = await Contact.findById(id)
    if (contact) {
      if (contact._owner === user.id) {
        await Contact.remove({ _id: id, _owner: user.id })
        ctx.status = 204
        ctx.body = ''
      } else {
        ctx.status = 403
        ctx.body = 'Forbidden'
      }
    } else {
      ctx.status = 404
    }
  } catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = 'INTERNAL SERVER ERROR'
  }
}

/**
 * Update contact.
 *
 * @param {any} ctx
 * @param {any} next
 */
const updateContact = async (ctx, next) => {
  const id = ctx.params.id
  if (id.length != 24) {
    ctx.status = 404
    return
  }
  const user = ctx.req.user
  const obj = {}
  formatBody(ctx.request.body, obj)
  try {
    const contact = await Contact.findById(id)
    if (contact) {
      if (contact._owner === user.id) {
        contact.set(obj);
        const ret = await contact.save()
        ctx.status = 201
        ctx.rest(ret)
      } else {
        ctx.status = 403
        ctx.body = 'Forbidden'
      }
    } else {
      ctx.status = 404
    }
  } catch (error) {
    console.error(error)
    ctx.throw(500)
  }
}

const map = {
  'GET /api/v1/contacts': getContacts,
  'GET /api/v1/contacts/:id': getContactById,
  'PATCH /api/v1/contacts/:id': updateContact,
  'POST /api/v1/contacts': createContact,
  'DELETE /api/v1/contacts/:id': deleteContact,
}


module.exports = map


