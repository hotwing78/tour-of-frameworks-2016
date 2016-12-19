const html = require('choo/html')
const navbar = require('../shared/navbar')
module.exports = (state, prev, send) => {
  return html`
    <div>
      ${navbar(state, prev, send)}
      <div class="jumbotron pa4">
        <h1>About Mad Science Tracker</h1>
        <p>Add about info here...</p>
        <a href="/" class="btn btn-primary">Home</a>
      </div>
    </div>
  `
}
