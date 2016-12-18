import fetch from 'isomorphic-fetch'
import { reduce } from 'ramda'
import qs from 'querystring'

const url = process.env.REACT_APP_API

const toJSON = res => res.json()

module.exports = () => {
  const list = (model, obj={}) =>
    fetch(`${url}/${model}?${reduce((a,v) => qs.stringify(v) ,'', [obj])}`)
      .then(toJSON)

  const get = (model, id) =>
    fetch(`${url}/${model}/${id}`)
      .then(toJSON)

  const post = (model, doc) =>
    fetch(`${url}/${model}`, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(toJSON)

  const put = (model, id, doc) =>
    fetch(`${url}/${model}/${id}`, {
      method: 'put',
      body: JSON.stringify(doc),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(toJSON)

  return {
    post,
    list,
    get,
    put
  }
}
