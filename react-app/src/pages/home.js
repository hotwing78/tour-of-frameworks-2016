import React from 'react'
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

export default () =>
  <Jumbotron className="pa4">
    <h1>Mad Science Projects</h1>
    <p>Welcome</p>
    <Grid>
      <Row>
        <Col xsHidden smHidden md={12} className="tc">
          <Link to="/projects/new">{ params => <Button bsStyle="primary" {...params}>Add New Project</Button> }</Link>
          <Link to="/projects">{ ({onClick}) =>
          <Button bsStyle="info" className="ml2" onClick={onClick}>View Current Projects</Button>
          }</Link>
        </Col>
        <Col mdHidden lgHidden xs={12}>
          <Link to="/projects/new">{ params => <Button bsStyle="primary" block {...params}>Add New Project</Button> }</Link>
          <Link to="/projects">{ ({onClick}) =>
            <Button bsStyle="info" block onClick={onClick}>View Current Projects</Button>
          }</Link>

        </Col>
      </Row>
    </Grid>
  </Jumbotron>
