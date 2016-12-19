const extend = require('xtend')
const choo = require('choo')
const http = require('xhr')
const url = 'http://localhost:4000'
const app = choo()
const { set, lensPath } = require('ramda')
const qs = require('querystring')

app.model({
  state: {
    projects: [],
    tasks: []
  },
  reducers: {
    setProjects: (state, projects) => extend(state, {projects}),
    setField: (state, data) => set(
      lensPath([data.model, data.field]),
      data.value,
      state
    ),
    setModel: (state, data) => set(lensPath([data.model]), data.value, state)
  },
  effects: {
    list: (state, data, send, done) => {
      http.get(`${url}/${data.model}${ data.query ? '?' + qs.stringify(data.query) : ''}`, {
        json: true
      }, (e,r,b) => {
        if (e) return done(e)
        send('setModel', { model: data.model, value: b }, function (err, value) {
          if (err) return done(err)
          done(null, value)
        })
      })
    },
    put: (state, data, send, done) => {
      http.put(`${url}/${data.model}/${data.doc.id}`, { json: data.doc }, (e,r,b) => {
        if (e) return done(e)
        send('setModel', { model: data.form, value: {} }, e => {
          send('location:set', data.redirect, done)
        })
      })
    },
    post: (state, data, send, done) => {
      http.post(`${url}/${data.model}`, { json: data.doc }, (e,r,b) => {
        if (e) return done(e)
        send('setModel', { model: data.form, value: {} }, e => {
          send('location:set', data.redirect, done)
        })
      })
    },
    get: (state, data, send, done) => {
      http.get(`${url}/${data.model}/${data.id}`, {json: true}, (e,r,b) => {
        send('setModel', { model: data.target, value: b }, done)
      })
    }
  }
  // ,
  // subscriptions: {
  //   'called-once-when-the-app-loads': function (send, done) {
  //     send('list', { model: 'projects'}, done)
  //   }
  // }
})

app.router([
  ['/', require('./pages/home')],
  ['/about', require('./pages/about')],
  ['/projects', require('./pages/projects')],
  ['/projects/new', require('./pages/projects/form')],
  ['/projects/:id', require('./pages/projects/show')],
  ['/projects/:id/edit', require('./pages/projects/form')],
  ['/projects/:id/tasks/new', require('./pages/projects/show')],
  ['/projects/:id/tasks/:task_id/show', require('./pages/projects/show')],
  ['/projects/:id/tasks/:task_id/edit', require('./pages/projects/show')]
])

const tree = app.start()
document.body.appendChild(tree)
