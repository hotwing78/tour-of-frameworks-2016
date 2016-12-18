import React from 'react'
import {Grid, Row, Col, PageHeader,
  ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router'

const Projects = React.createClass({
  getInitialState() {
    return {
      projects: []
    }
  },
  componentDidMount() {
    this.props.list('projects')
      .then(projects => this.setState({projects}))
  },
  render() {
    const list = project =>
      <Link to={`/projects/${project.id}/tasks`}>{ params => <ListGroupItem
        key={project.id}
        href={params.href}
        header={project.title}>
        {project.description}
      </ListGroupItem>
    }</Link>
    return (
      <Grid>
        <Row>
          <Col className="ph4">
            <PageHeader>Projects</PageHeader>
            <ListGroup>
              {this.state.projects.map(list)}
            </ListGroup>

          </Col>
        </Row>
      </Grid>
    )
  },
  propTypes: {
    list: React.PropTypes.func.isRequired
  }
})


module.exports = Projects
