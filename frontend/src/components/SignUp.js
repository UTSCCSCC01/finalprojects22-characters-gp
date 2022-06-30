import React, { Component } from "react";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import config from '../config';
import { Link } from "react-router-dom";

class CreateItem extends Component {
    constructor(props) {
        super(props)
        // Setting up functions
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
        this.verifyForm = this.verifyForm.bind(this);
        this.clearWarning = this.clearWarning.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // Setting up state
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            warnings: {}
        };
    }
    clearWarning(field) {
        // clears the specific warning if the field in warning is defined
        if (!!this.state.warnings[field])
            this.setState({
                warnings: {
                    ...this.state.warnings,
                    [field]: null
                }
            })
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value })
        this.clearWarning('email')
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value })
        this.clearWarning('password')
    }
    onChangePasswordConfirm(e) {
        this.setState({ passwordConfirm: e.target.value })
        this.clearWarning('passwordConfirm')
    }

    async onSubmit(e) {
        e.preventDefault()
        const newWarnings = await this.verifyForm()
        if (Object.keys(newWarnings).length > 0) {
            this.setState({ warnings: newWarnings })
            return
        }
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        axios.post(config.backend + '/users', data)
            .then(res => {
                console.log(res)
                this.props.signIn(res.data[0])
                this.props.history.goBack()
            });
        this.setState({
            email: '',
            password: '',
            passwordConfirm: '',
            warnings: {}
        })
    }
    async verifyForm() {
        let newWarnings = {}
        if (!this.state.firstName) {
            newWarnings.firstName = 'Please provide a first name.'
        }
        if (!this.state.lastName) {
            newWarnings.lastName = 'Please provide a last name.'
        }
        if (!this.state.email) {
            newWarnings.email = 'Please provide a valid email.'
        }
        else if (!String(this.state.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            newWarnings.email = 'Invalid email.'
        } else {
            let res = await axios.get(config.backend + '/users/?email=' + this.state.email, this.state);
            console.log(res.data)
            if (res.data.length > 0) {
                newWarnings.email = 'An account already exists with this email.'
            }
        }
        if (!this.state.password) {
            newWarnings.password = 'Please provide a password.'
        } else if (this.state.password.length < 8) {
            newWarnings.password = 'Please enter a password with at least 8 characters.'
        }
        if (this.state.password != this.state.passwordConfirm) {
            newWarnings.passwordConfirm = 'Does not match the password.'
        }
        return new Promise((res, rej) => res(newWarnings));
    }
    render() {
        return (<div className="form-wrapper">

            <Row className="justify-content-md-center mt-4">
                <Col md="6">

                    <Card className="p-4">
                        <h2>
                            Sign Up
                        </h2>
                        <hr className="mb-4" />
                        <Form noValidate onSubmit={this.onSubmit}>
                            {/* You can disable the default UI by adding the HTML noValidate attribute to your <Form> or <form> element. */}
                            <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={this.state.email} onChange={(e) => { this.setState({ firstName: e.target.value }) }} isInvalid={!!this.state.warnings.firstName}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.warnings.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="LastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={this.state.lastName} onChange={(e) => { this.setState({ lastName: e.target.value }) }} isInvalid={!!this.state.warnings.lastName}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.warnings.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" value={this.state.email} onChange={this.onChangeEmail} isInvalid={!!this.state.warnings.email}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.warnings.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="Password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} isInvalid={!!this.state.warnings.password}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.warnings.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="PasswordConfirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" value={this.state.passwordConfirm} onChange={this.onChangePasswordConfirm} isInvalid={!!this.state.warnings.passwordConfirm}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {this.state.warnings.passwordConfirm}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
                                Sign Up
                            </Button>
                        </Form>
                    </Card>
                    Already have an account? <Link to="/Login" replace>Sign in</Link>
                </Col>
            </Row>

        </div>);
    }
}

export default CreateItem;