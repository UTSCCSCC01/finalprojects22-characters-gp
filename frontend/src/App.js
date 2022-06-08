import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import CreateItem from './components/create-item'
import EditItem from './components/edit-item'
import ItemList from './components/inventory'
import DeletedItemList from './components/undelete-item'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
      <Router>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/create-item'} className="nav-link">
                  Simple CRUD App for inventory
                </Link>
              </Navbar.Brand>
              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/create-item'} className="nav-link">
                    Create Item
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/item-list'} className="nav-link">
                    Inventory List
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/deleted-item-list'} className="nav-link">
                    Deleted Items
                  </Link>
                </Nav>
                <Nav>
                  <Link to={'/login'} className="nav-link">
                    Login
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
                    path="/"
                    component={(props) => <CreateItem {...props} />}
                  />
                  <Route
                    exact
                    path="/create-item"
                    component={(props) => <CreateItem {...props} />}
                  />
                  <Route
                    exact
                    path="/edit-item/:id"
                    component={(props) => <EditItem {...props} />}
                  />
                  <Route
                    exact
                    path="/item-list"
                    component={(props) => <ItemList {...props} />}
                  />
                  <Route
                    exact
                    path="/deleted-item-list"
                    component={(props) => <DeletedItemList {...props} />}
                  />
                  <Route
                    exact
                    path="/Login"
                    component={(props) => <Login {... props} />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  )
}
export default App