import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import config from '../config'
import PasswordEdit from './PasswordEdit';
import ProfileEdit from './ProfileEdit';

class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        //setup SubmitForm methods
        //setup SubmitForm state
        this.state = {
            _id: '',
            email: ''
        }
    }


    render() {
        return (<div>
            <Row>
                {/* <Col md="2">
                    <nav id="navbar-example3" class="navbar navbar-light bg-light flex-column align-items-stretch p-3">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="#item-1">Item 1</a>
                            <nav class="nav nav-pills flex-column">
                                <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
                                <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
                            </nav>
                            <a class="nav-link" href="#item-2">Item 2</a>
                            <a class="nav-link" href="#item-3">Item 3</a>
                            <nav class="nav nav-pills flex-column">
                                <a class="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
                                <a class="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
                            </nav>
                        </nav>
                    </nav>
                </Col> */}
                <Col>
                    <ProfileEdit _id={this.props.match.params.id} setToast={this.props.setToast} />
                    <PasswordEdit _id={this.props.match.params.id} setToast={this.props.setToast} />

                </Col>
            </Row>
        </div>
        )
    }
}


export default ProfileInfo;