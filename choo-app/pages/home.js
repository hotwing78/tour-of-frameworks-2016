const html = require('choo/html')
const navbar = require('../shared/navbar')
module.exports = (state, prev, send) => {
  return html`
    <div>
      ${navbar(state, prev, send)}
      <div class="jumbotron pa4">
        <h1>Mad Science Tracker</h1>
        <p>Current Mad Science Projects</p>
        <a href="/projects/new" class="btn btn-primary">Add New Project</a>
        <a href="/projects" class="btn btn-info">View Projects</a>
      </div>
    </div>
  `
}
