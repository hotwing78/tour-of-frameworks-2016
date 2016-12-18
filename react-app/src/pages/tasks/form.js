import React from 'react'

import { Grid, Row, Col, PageHeader,
  FormGroup, ControlLabel, FormControl,
  Button } from 'react-bootstrap'

import { Redirect } from 'react-router'

import { set, lensProp } from 'ramda'


const TaskForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      description: '',
      status: '',
      parent_id: null
    }
  },
  componentDidMount(){
    if (this.props.parent_id) {
      this.setState({ parent_id: this.props.parent_id })
    }
    if (this.props.params.task_id) {
      this.props.get('tasks', this.props.params.task_id)
        .then(task => this.setState(task))
    }
  },
  handleChange(field) {
    return e => {
      this.setState(
        set(
          lensProp(field),
          e.target.value,
          this.state
        )
      )
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.id) {
      return this.props.put('tasks', this.state.id, this.state)
        .then(res => this.setState({resolved: true}))
    }
    this.props.post('tasks', this.state)
      .then(res => this.setState({resolved: true}))
  },
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            {this.state.resolved ? <Redirect to={`/projects/${this.state.parent_id}/tasks`} /> : null }
            <PageHeader>Task Form</PageHeader>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  placeholder="task name"
                >
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                >

                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Status</ControlLabel>
                <FormControl
                  componentClass="select"
                  value={this.state.status}
                  onChange={this.handleChange('status')}
                  >
                  <option>select</option>
                  <option>open</option>
                  <option>closed</option>
                  <option>cancelled</option>
                </FormControl>
              </FormGroup>
              <Button type="submit">Submit</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
})

module.exports = TaskForm
