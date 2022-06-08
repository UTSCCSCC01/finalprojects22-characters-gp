import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import config from '../config'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.validateLogin = this.validateLogin.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            email: "",
            password: "",
            warnings: {},
        }
    }
    onChangeEmail(event){
        this.setState({ email: event.target.value })
    }
    onChangePassword(event){
        this.setState({ password: event.target.value })
    }
    validateLogin(data){
        let newWarnings = {}

        //If user entered email is found
        if (data.length > 0){
            if (data[0]['password'] != this.state.password){
                newWarnings.password = "Incorrect password"
                this.setState({warnings: newWarnings})
            }
            else {
                //Redirect to homepage
                console.log("Login Successful")
                this.setState({warnings: {}})
            }
        }
        else {
            newWarnings.email = "The email entered is not registered!"
            this.setState({warnings: newWarnings})
        }

        //Else case
        if (this.state.email == "" && this.state.password == ""){
            newWarnings.email = "Email field cannot be empty!"
            newWarnings.password = "Password field cannot be empty!"
        }
        else if (this.state.email == ""){
            newWarnings.email = "Email field cannot be empty!"
        }
        else if (this.state.password == ""){
            newWarnings.password = "Password field cannot be empty!"
        }
        else if (!String(this.state.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            newWarnings.email = "Invalid email"
        }

        //Set warnings
        if (newWarnings != {}){
            this.setState({warnings: newWarnings})
        }
    }

    onSubmit(event){
        event.preventDefault()
        axios.get(config.backend+'/users/?email=' + this.state.email, this.state)
        .then(res => this.validateLogin(res.data))
    }
    
    render(){
        return (<div className="form-wrapper">
            <Form noValidate onSubmit={this.onSubmit}>
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" value={this.state.email} onChange={this.onChangeEmail} isInvalid={!!this.state.warnings.email} placeholder="Enter email"/>
                    <Form.Control.Feedback type='invalid'> {this.state.warnings.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" value={this.state.password} onChange={this.onChangePassword} isInvalid={!!this.state.warnings.password} placeholder="Enter password"/>
                    <Form.Control.Feedback type='invalid'> {this.state.warnings.password}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" size="lg" type="submit" className="mt-4">Login</Button>
            </Form>
        </div>);
    }
}