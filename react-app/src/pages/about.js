import React from 'react'
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

export default () =>
  <Jumbotron className="pa4">
    <h1>Mad Science Projects</h1>
    <p>About</p>
    <Grid>
      <Row>
        <Col xsHidden smHidden md={12} className="tc">
          <Button bsStyle="primary">Home</Button>
        </Col>
        <Col mdHidden lgHidden xs={12}>
          <Link to="/">{ ({onClick}) => 
            <Button bsStyle="primary" block onClick={onClick}>Home</Button>
          }</Link>
        </Col>
      </Row>
    </Grid>
  </Jumbotron>
