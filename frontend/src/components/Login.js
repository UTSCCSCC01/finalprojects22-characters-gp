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
        }
    }
    onChangeEmail(event){
        this.setState({ email: event.target.value })
    }
    onChangePassword(event){
        this.setState({ password: event.target.value })
    }
    validateLogin(data){
        if (this.state.email == "" && this.state.password == ""){
            console.log("Email and password field cannot be empty!")
            return
        }
        else if (this.state.email == ""){
            console.log("Email field cannot be empty!")
            return
        }
        else if (this.state.password == ""){
            console.log("Password field cannot be empty!")
            return
        }

        if (data.length > 0){
            if (data[0]['password'] != this.state.password){
                console.log("Incorrect password")
            }
            else {
                //Redirect to homepage
                console.log("Login Successful")
            }
        }
        else {
            console.log("The email entered is not registered!")
        }
    }
    onSubmit(event){
        event.preventDefault()
        axios.get(config.backend+'/users/?email=' + this.state.email, this.state)
        .then(res => this.validateLogin(res.data))
    }
    
    render(){
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" value={this.state.email} onChange={this.onChangeEmail}  placeholder="Enter email"/>
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" value={this.state.password} onChange={this.onChangePassword} placeholder="Enter password"/>
                </Form.Group>
                <Button variant="primary" size="lg" type="submit" className="mt-4">Login</Button>
            </Form>
        </div>);
    }
}