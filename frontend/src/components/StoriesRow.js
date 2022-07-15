import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col } from 'react-bootstrap';
  

export default class StoriesRow extends Component {
    constructor(props) {
        super(props);
        this.goToDetails = this.goToDetails.bind(this);
    }


    goToDetails() {
        this.props.history.push('/stories/' + this.props.obj._id);
    }

    render() {
        return (
            <Row xs={1} md={1} className="g-4">
                <Col>
                    <Card className="m-1" width='100%'>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col><Card.Title style={{ float: 'left' }}>{this.props.obj.storyTitle}</Card.Title></Col>
                                    <Col><Card.Text>
                                        Status: {this.props.obj.storyStatus}
                                    </Card.Text></Col>
                                    <Col><Button onClick={this.goToDetails} size="sm" variant="danger" style={{ float: 'right' }} type="submit">Details</Button></Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        );
    }
}