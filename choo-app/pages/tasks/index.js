const html = require('choo/html')

module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href) {
    send('list', { model: 'tasks', query: { parent_id: state.location.params.id }}, err => err ? console.log(err) : null )
  }

  const li = task => html`
    <a href="${state.location.pathname}/tasks/${task.id}/show" class="list-group-item">${task.name}</a>
  `

  return html`
  <div>
    <div class="pull-right">
      <a class="btn btn-primary" href="${state.location.pathname}/tasks/new">New Task</a>
    </div>
    <h3>Tasks</h3>
    <br />
    <div class="list-group">
      ${state.tasks.map(li)}
    </div>
  </div>
  `
}
