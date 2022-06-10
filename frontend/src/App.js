import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import StoriesList from './components/StoriesList'
import SubmitStory from './components/SubmitStory'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.state = { user: null };
  }
  //componentDidMount() method runs after the component output has been rendered to the DOM.
  componentDidMount() {
    const userData = localStorage.getItem('user')
    if (userData !== null) {
      const parsedData = JSON.parse(userData)
      this.setState({ user: parsedData })
    }
  }

  // this function is passed in the SignUp and Login components to change the user state.
  signIn(data) {
    this.setState({ user: data })
    localStorage.setItem('user', JSON.stringify(data))
    console.log("Signed In!", data)
  }

  signOut() {
    localStorage.removeItem('user')
    this.setState({ user: null })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/create-item'} className="nav-link">
                  Characters
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/StoriesList'} className="nav-link">
                    Story Statuses
                  </Link>
                </Nav>
                {this.state.user === null ?
                  <Nav>
                    <Link to={'/signup'} className="nav-link">
                      Sign Up
                    </Link>
                  </Nav>
                  :
                  <Nav>
                    <Link to={'/'} onClick={this.signOut} className="nav-link">
                      Sign Out
                    </Link>

                  </Nav>
                }
                {this.state.user === null &&
                <Nav>
                  <Link to={'/login'} className="nav-link">
                    Login
                  </Link>
                </Nav>}
                <Nav>
                  <Link to={'/submitStory'} className="nav-link">
                    Submit a story
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Switch>
                    <Route
                      exact
                      path="/signup"
                      render={(props) => <SignUp {...props} signIn={this.signIn} />} />
                    <Route
                      exact
                      path="/Login"
                      component={(props) => <Login {... props} signIn={this.signIn} />}
                    />
                    <Route
                      exact
                      path="/StoriesList"
                      render={(props) => <StoriesList {...props} />} />
                    <Route
                      exact
                      path="/submitStory"
                      component={(props) => <SubmitStory {... props} />} />
                  </Switch>
                </div>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
    )
  }
}
export default App