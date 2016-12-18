import React from 'react'

import { Grid, Row, Col, PageHeader, Button, Label } from 'react-bootstrap'
import { Match, Link } from 'react-router'
import Tasks from '../tasks'
import TaskForm from '../tasks/form'
import Task from '../tasks/show'

const Project = React.createClass({
  getInitialState() {
    return {
      title: 'Project Not Found'
    }
  },
  componentDidMount() {
    this.props.get('projects', this.props.params.id)
      .then(project => this.setState(project))
  },
  render() {
    const { pathname, list, post, get, put } = this.props
    return (
      <Grid>
        <Row>
          <Col className="ph4">
            <PageHeader>
              <Link to={`/projects/${this.state.id}/edit`}>
              { ({onClick}) => <Button className="fr" onClick={onClick}>Edit</Button> }
              </Link>
              {this.state.title}
              <br />
              <small><Label bsStyle="danger">{this.state.status}</Label></small>
              <small className="db mt3">{this.state.description}</small>
            </PageHeader>
            <Match exactly pattern={`${pathname}`} render={props =>
              <Tasks
                parent_id={this.props.params.id}
                list={list} {...props} />
            } />
            <Match pattern={`${pathname}/new`} render={props =>
              <TaskForm
                parent_id={this.state.id}
                post={post}
                {...props}
              />
            } />
            <Match pattern={`${pathname}/:task_id/show`} render={props =>
              <Task
                parent_id={this.state.id}
                get={get}
                {...props}
              />
            }/>
            <Match pattern={`${pathname}/:task_id/edit`} render={props =>
              <TaskForm
                parent_id={this.state.id}
                get={get}
                put={put}
                {...props}
              />
            }/>

          </Col>
        </Row>
      </Grid>
    )
  }
})

module.exports = Project
