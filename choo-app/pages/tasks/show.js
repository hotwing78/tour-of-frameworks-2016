const html = require('choo/html')
const { path } = require('ramda')

module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href) {
    send('get', {
      model: 'tasks',
      id: state.location.params.task_id,
      target: 'task'
    })
  }

  return html`
    <div>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${path(['task','name'], state)}</h3>
        </div>
        <div class="panel-body">
          ${path(['task','description'], state)}
          <br />
          <div class="pull-right">
            <a href="/projects/${state.location.params.id}/tasks/${state.location.params.task_id}/edit" class="btn btn-primary">Edit</a>
            <a href="/projects/${state.location.params.id}" class="btn btn-info">Close</a>
          </div>
        </div>
      </div>
    </div>
  `
}
