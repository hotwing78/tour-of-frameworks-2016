import React from 'react'
import { Link } from 'react-router'
import { Panel, Button } from 'react-bootstrap'

const Task = React.createClass({
  getInitialState() {
    return {
      name: '',
      status: 'not specified'
    }
  },
  componentDidMount() {
    this.props.get('tasks', this.props.params.task_id)
      .then(task => this.setState(task))
  },
  render() {
    return (
      <Panel header={<h3>{this.state.name}</h3>}>
        {this.state.description}
        <br />
        <Link to={`/projects/${this.props.parent_id}/tasks`}>{ ({onClick}) =>
          <Button
            className="fr"
            bsStyle="primary"
            onClick={onClick}>
            Back
          </Button>
        }</Link>
        <Link to={`/projects/${this.props.parent_id}/tasks/${this.state.id}/edit`}>{ ({onClick}) =>
          <Button
            className="fr mr2"
            bsStyle="primary"
            onClick={onClick}>
            Edit
          </Button>
        }</Link>


      </Panel>
    )
  }
})

module.exports = Task
