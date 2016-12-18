import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Match, Link } from 'react-router'

import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Home from './pages/home'
import About from './pages/about'
import Projects from './pages/projects'
import ProjectForm from './pages/projects/form'
import Project from './pages/projects/show'

import data from './utils/data'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data()
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Mad Science Projects</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <Link to="/projects">{ ({href}) => <NavItem eventKey={1} href={href}>Projects</NavItem> }</Link>
                <Link to="/about">{params => <NavItem eventKey={2} {...params}>About</NavItem>}</Link>
                <NavItem eventKey={3} href="http://github.com/twilson63" target="_blank">Github</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
          <Match exactly pattern="/projects" render={ props =>
             <Projects list={this.state.data.list} {...props} />
          } />
          <Match pattern="/projects/new" render={ props =>
            <ProjectForm post={this.state.data.post} {...props} />
          } />
          <Match pattern="/projects/:id/tasks" render={ props =>
            <Project
              get={this.state.data.get}
              list={this.state.data.list}
              post={this.state.data.post}
              put={this.state.data.put}
              {...props}
            />
          } />
          <Match pattern="/projects/:id/edit" render={ props =>
            <ProjectForm
              put={this.state.data.put}
              get={this.state.data.get} {...props} />
          } />


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
