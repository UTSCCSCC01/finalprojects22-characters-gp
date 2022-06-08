import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../config';

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

    onSubmit(e) {
        e.preventDefault()
        const newWarnings = this.verifyForm()
        if (Object.keys(newWarnings).length > 0) {
            this.setState({ warnings: newWarnings })
            return
        }
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post(config.backend + '/users', data)
            .then(res => {
                console.log(res)
                this.props.signIn(res.data)
                this.props.history.push('/')
            });
        this.setState({
            email: '',
            password: '',
            passwordConfirm: '',
            warnings: {}
        })
    }
    verifyForm() {
        let newWarnings = {}
        if (!this.state.email) {
            newWarnings.email = 'Please provide a valid email.'
        }
        else if (!String(this.state.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            newWarnings.email = 'Invalid email.'
        }
        if (!this.state.password) {
            newWarnings.password = 'Please provide a password.'
        }
        if (this.state.password != this.state.passwordConfirm) {
            newWarnings.passwordConfirm = 'Does not match the password.'
        }
        return newWarnings
    }
    render() {
        return (<div className="form-wrapper">
            <Form noValidate onSubmit={this.onSubmit}>
                {/* You can disable the default UI by adding the HTML noValidate attribute to your <Form> or <form> element. */}
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
        </div>);
    }
}

export default CreateItem;