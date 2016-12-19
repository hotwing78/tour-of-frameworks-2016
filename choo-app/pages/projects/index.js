const html = require('choo/html')
const navbar = require('../../shared/navbar')

module.exports = (state, prev, send) => {
  if (state.location.href !== prev.location.href) {
    send('list', { model: 'projects'}, err => err ? console.log(err) : null )
  }

  const li = project => html`
    <a href="/projects/${project.id}" class="list-group-item">${project.title}</a>
  `

  return html`
  <div>
    ${navbar(state, prev, send)}
    <div class="container-fluid">
      <div class="page-header">
        <div class="pull-right">
          <a class="btn btn-primary" href="/projects/new">New Project</a>
        </div>
        <h1>Projects</h1>
      </div>
      <div class="list-group">
        ${state.projects.map(li)}
      </div>
    </div>
  </div>
  `
}
