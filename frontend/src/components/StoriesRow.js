import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import config from '../config'
import StoryDetails from './StoryDetails'
  

export default class StoriesRow extends Component {
    constructor(props) {
        super(props);
        this.goToDetails = this.goToDetails.bind(this);
    }
    

    goToDetails() {    
        //let story = this.state.filter(res => this.state._id === this.props.obj._id)[0];
        //let story = this.state.stories.filter(res => this.state.stories._id === this.props.obj._id);
        this.props.history.push('/stories/'+this.props.obj._id);
    }

    render() {
        return (
            <Row xs={1} md={1} className="g-4">
                <Col>
                <Card width='100%'>
                    <Card.Body>
                    <Container>
                    <Row>
                        <Col><Card.Title>{this.props.obj.storyTitle}</Card.Title></Col>
                        <Col><Card.Text>
                            Status: {this.props.obj.storyStatus}
                        </Card.Text></Col>
                        <Col><Button onClick={this.goToDetails} size="sm" variant="danger" style={{float: 'right'}} type="submit">Details</Button></Col>
                    </Row>
                    </Container>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
            
    );
    }
}