import React from 'react'
import { PageHeader, FormGroup,
  Button, ControlLabel, FormControl,
  Grid, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router'

import { set, lensProp } from 'ramda'

const ProjectForm = React.createClass({
  getInitialState() {
    return {
      title: '',
      description: '',
      status: 'New'
    }
  },
  handleChange (field) {
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
  propTypes: {
    post: React.PropTypes.func,
    put: React.PropTypes.func,
    get: React.PropTypes.func
  },
  handleSubmit(e) {
    e.preventDefault()
    if (this.props.params.id) {
      return this.props.put('projects', this.state.id, this.state)
        .then(res => this.setState({resolved: true}))
    }
    this.props.post('projects', this.state)
      .then(res => this.setState({resolved: true}))
  },
  componentDidMount() {
    if (this.props.params.id) {
      this.props.get('projects', this.props.params.id)
        .then(project => this.setState(project))

    }
  },
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} sm={12} xs={12} className="ph4">
            { this.state.resolved ? <Redirect to='/projects' /> : null }
            <PageHeader>
              Project Form
            </PageHeader>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  value={this.state.title}
                  onChange={this.handleChange('title')}
                  placeholder="Enter Project Name"></FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  componentClass="textarea"
                  placeholder="description of project"></FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Status</ControlLabel>
                <FormControl
                  value={this.state.status}
                  onChange={this.handleChange('status')}
                  componentClass="select" placeholder="status">
                  <option value="select">select</option>
                  <option value="active">active</option>
                  <option value="hold">hold</option>
                  <option value="complete">completed</option>
                  <option value="abandoned">abandoned</option>

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

module.exports = ProjectForm
