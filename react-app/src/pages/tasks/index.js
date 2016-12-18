import React from 'react'
import {Grid, Row, Col, PageHeader,
  ListGroup, ListGroupItem, Button, Label } from 'react-bootstrap'
import { Link } from 'react-router'

const Tasks = React.createClass({
  getInitialState() {
    return {
      tasks: []
    }
  },
  componentDidMount() {
    console.log(this.props.parent_id)
    this.props.list('tasks', {
      parent_id: this.props.parent_id
    })
    .then(tasks => this.setState({ tasks }))
  },
  render() {
    const list = task =>
      <Link to={`/projects/${this.props.parent_id}/tasks/${task.id}/show`}>{ params => <ListGroupItem
        key={task.id}
        href={params.href}>
        {task.name}
        <Label className="fr" bsStyle="info">{task.status}</Label>
      </ListGroupItem>
    }</Link>
    return (
      <Grid>
        <Row>
          <Col className="ph4">
            <Link to={`${this.props.pathname}/new`}>{ ({onClick}) =>
              <Button
                onClick={onClick}
                bsStyle="primary"
                className="fr">New Task</Button>
            }</Link>
            <h3 className="mb4">Tasks</h3>
            <ListGroup>
              {this.state.tasks.map(list)}
            </ListGroup>

          </Col>
        </Row>
      </Grid>
    )
  }
})

module.exports = Tasks
