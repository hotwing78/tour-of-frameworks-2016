const html = require('choo/html')
const navbar = require('../../shared/navbar')
const { path, pathOr } = require('ramda')

const Tasks = require('../tasks')
const TaskForm = require('../tasks/form')
const Task = require('../tasks/show')


module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href) {
    send('get', {
      model: 'projects',
      id: state.location.params.id,
      target: 'project'
    })
  }

  return html`
  <div>
    ${navbar(state, prev, send)}
    <div class="container-fluid">
      <div class="page-header">
        <div class="pull-right">
          <a class="btn btn-primary" href="/projects/${path(['project', 'id'], state)}/edit">Edit</a>
        </div>
        <h1>${path(['project', 'title'], state)}</h1>
        <small>${path(['project', 'description'], state)}</small>
      </div>
      <div class="grid">
        ${pathOr('', ['location','pathname'], state).indexOf('tasks') !== -1 ? null : Tasks(state, prev, send)}
        ${pathOr('', ['location','pathname'], state).indexOf('tasks/new') === -1 ? null : TaskForm(state, prev, send)}
        ${pathOr('', ['location','pathname'], state).indexOf('show') === -1 ? null : Task(state, prev, send)}
        ${pathOr('', ['location','pathname'], state).indexOf('edit') === -1 ? null : TaskForm(state, prev, send)}
      </div>
    </div>
  </div>
  `
}
