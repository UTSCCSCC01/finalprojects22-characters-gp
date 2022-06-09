import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col } from 'react-bootstrap';
import config from '../config'
  

export default class StoriesRow extends Component {
    constructor(props) {
        super(props);
        this.goToDetails = this.goToDetails.bind(this);
    }
    

    goToDetails() {    
        //let story = this.state.filter(res => this.state._id === this.props.obj._id)[0];
        //let story = this.state.stories.filter(res => this.state.stories._id === this.props.obj._id);
    }

    render() {
        return (
            <Row xs={1} md={1} className="g-4">
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col>
                        <Card width='100%'>
                            <Card.Body>
                            <Container>
                            <Row>
                                <Col><Card.Title>{this.props.obj.storyTitle}</Card.Title></Col>
                                <Col><Card.Text>
                                 Status: {this.props.obj.submissionStatus}
                                </Card.Text></Col>
                                <Col><Button onClick={this.goToDetails} size="sm" variant="danger" style={{float: 'right'}} type="submit">Details</Button></Col>
                            </Row>
                            </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }
}