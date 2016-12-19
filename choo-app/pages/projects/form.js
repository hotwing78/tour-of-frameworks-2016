const html = require('choo/html')
const navbar = require('../../shared/navbar')
const { pathOr } = require('ramda')

module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href && state.location.params.id) {
    send('get', {
      model: 'projects',
      id: state.location.params.id,
      target: 'project'
    })
  } else if (state.location.href !== prev.location.href) {
    send('setModel', {
      model:'project',
      value: {}
    })
  }
  
  const handleInput = field => e => send('setField',{
    model: 'project',
    field,
    value: e.target.value
  })

  const handleSubmit = e => {
    e.preventDefault()
    send(pathOr(null, ['location', 'params', 'id'], state) ? 'put' : 'post', {
      model: 'projects',
      doc: state.project,
      form: 'project',
      redirect: '/projects'
    })
  }

  return html`
  <div>
    ${navbar(state, prev, send)}
    <div class="container-fluid">
      <div class="page-header">
        <h1>Project Form</h1>
      </div>
      <form onsubmit=${handleSubmit}>
        <div class="form-group">
          <label class="">Title</label>
          <input class="form-control" type="text"
            value=${pathOr('',['project', 'title'], state)}
            oninput=${handleInput('title')} />
        </div>
        <div class="form-group">
          <label class="">Description</label>
          <input class="form-control" type="text"
            value=${pathOr('',['project', 'description'], state)}
            oninput=${handleInput('description')} />
        </div>
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
  `
}
