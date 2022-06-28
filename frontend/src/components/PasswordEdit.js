import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import config from '../config'

export default class PasswordEdit extends Component {
    constructor(props) {
        super(props);
        //setup SubmitForm methods
        //bind methods to pass to other components
        this.savePassword = this.savePassword.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        //setup SubmitForm state
        this.state = {
            old: '',
            new: '',
            confirmNew: '',
            warnings: {
                old: '',
                new: '',
                confirmNew: ''
            }
        }
    }

    async savePassword(e) {
        e.preventDefault();
        console.log(this.state)
        const newWarnings = await this.verifyPassword()
        if (Object.keys(newWarnings).length > 0) {
            this.setState({ warnings: newWarnings })
            return
        }
        const data = {
            password: this.state.new
        };
        axios.put(config.backend + '/users/' + this.props._id, data)
            .then(res => {
                this.props.setToast("Password successfully changed")
            });
        this.setState({
            old: '',
            new: '',
            confirmNew: '',
            warnings: {
                old: '',
                new: '',
                confirmNew: ''
            }
        })
    }

    async verifyPassword() {
        let newWarnings = {}
        let res = await axios.get(config.backend + '/users/' + this.props._id);
        if (res.data.password !== this.state.old) {
            newWarnings.old = 'Incorrect password.'
        }
        if (!this.state.new) {
            newWarnings.new = 'Please provide a password.'
        } else if (this.state.new.length < 8) {
            newWarnings.new = 'Please enter a password with at least 8 characters.'
        } else if (this.state.old === this.state.new) {
            newWarnings.new = 'Please enter a new password that is different from your old password.'
        }
        if (this.state.new != this.state.confirmNew) {
            newWarnings.confirmNew = 'Does not match the new password.'
        }
        return new Promise((res, rej) => res(newWarnings));
    }


    render() {
        return (
            <Card className="text-start p-4">
                <Form noValidate onSubmit={this.savePassword}>
                    <h3 className="mb-4">Change Password</h3>
                    <Form.Group controlId="oldPassword" >
                        <Form.Label>
                            Old Password
                        </Form.Label>
                        <Form.Control required type="password"
                            onChange={(e) => this.setState({ old: e.target.value })} value={this.state.old} isInvalid={!!this.state.warnings.old}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.warnings.old}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>
                            New Password
                        </Form.Label>
                        <Form.Control required type="password"
                            onChange={(e) => this.setState({ new: e.target.value })} value={this.state.new} isInvalid={!!this.state.warnings.new}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.warnings.new}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="confirmNewPassword">
                        <Form.Label>
                            Comfirm New Password
                        </Form.Label>
                        <Form.Control required type="password"
                            onChange={(e) => this.setState({ confirmNew: e.target.value })} value={this.state.confirmNew} isInvalid={!!this.state.warnings.confirmNew}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {this.state.warnings.confirmNew}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button size="md" block="block" type="submit" className="mt-4">
                        Save
                    </Button>
                </Form>

                {this.state.submissionSuccess == 'true' &&
                    <Alert variant="success" onClose={() => this.setState({ submissionSuccess: false })} dismissible>
                        <Alert.Heading>Your story has been successfully submitted.</Alert.Heading>
                    </Alert>
                }

            </Card>
        )
    }
}