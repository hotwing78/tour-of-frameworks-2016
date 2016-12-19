const html = require('choo/html')
const { path, pathOr } = require('ramda')

module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href && state.location.params.task_id) {
    send('get', {
      model: 'tasks',
      id: state.location.params.task_id,
      target: 'task'
    })
  } else if (state.location.href !== prev.location.href) {
    send('setModel', {
      model:'task',
      value: {
        parent_id: path(['location', 'params', 'id'], state)
      }
    })
  }

  const handleInput = field => e => send('setField',{
    model: 'task',
    field,
    value: e.target.value
  })

  const handleSubmit = e => {
    e.preventDefault()
    send(pathOr(null, ['location', 'params', 'task_id'], state) ? 'put' : 'post', {
      model: 'tasks',
      doc: state.task,
      form: 'task',
      redirect: `/projects/${path(['location', 'params', 'id'], state)}`
    })
  }

  return html`
  <div>
    <h3>Task Form</h3>
    <form onsubmit=${handleSubmit}>
      <div class="form-group">
        <label class="">Name</label>
        <input class="form-control" type="text"
          value=${pathOr('',['task', 'name'], state)}
          oninput=${handleInput('name')} />
      </div>
      <div class="form-group">
        <label class="">Description</label>
        <input class="form-control" type="text"
          value=${pathOr('',['task', 'description'], state)}
          oninput=${handleInput('description')} />
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
  `
}
