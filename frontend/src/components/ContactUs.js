import React, { Component } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import config from '../config'

class ContactUs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            email: '',
            message: '',
            submitted: false
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeMessage(e){
        this.setState({message: e.target.value});
    }
    onChangeEmail(e){
        this.setState({email: e.target.value});
    }
    onChangeName(e){
        this.setState({name: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.props.user){
            //get their userID for employee to reference if needed
            // if not logged the field is ''
            // let the employee know they were not logged in 
            
        }
        // create a json with the data
        const data = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
        }
        // 
    }
    
    render() {
        return (<div className="form-wrapper">
            <Row className="justify-content-md-center mt-4">
            <Col md="6">
                <Card className="p-4">
                    <Card.Title className='mb-4'><h2>Contact Us</h2></Card.Title>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className='mb-4' controlId='text'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                required 
                                type="text" 
                                placeholder='Enter your name'
                                onChange={this.onChangeName}
                                value={this.state.name}
                                />
                        </Form.Group>
                        
                        <Form.Group className='mb-4' controlId='formBasicEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                required 
                                type="email" 
                                placeholder='Enter your email'
                                onChange={this.onChangeEmail}
                                value={this.state.email}
                                />
                        </Form.Group>

                        <Form.Group className='mb-4' controlId="formControlsTextarea">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea"
                                placeholder="Share your thoughts with us"
                                rows={8}
                                required
                                onChange={this.onChangeMessage}
                                value = {this.state.message}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                        {this.state.submitted == 'true'}
                    </Form>

                </Card>
            </Col>
            </Row>
            </div>);
    }
}

export default ContactUs;