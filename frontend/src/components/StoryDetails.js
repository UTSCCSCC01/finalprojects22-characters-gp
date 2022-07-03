import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import config from '../config'

export default class StoryDetails extends Component {
    constructor(props) {
        super(props)

        // State
        this.state = {
            title: '',
            text: '',
            status: '',
            type: '',  //storyType == "customApparel" OR "characterCandidate"
            date: null,
        }

        this.updateStatus = this.updateStatus.bind(this);
    }

    //access the db to fetch the data to display

    componentDidMount() {
        axios.get(config.backend + '/stories/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.storyTitle,
                    text: res.data.storyText,
                    status: res.data.storyStatus,
                    type: res.data.storyType,
                    author: res.data.author,
                    date: new Date(res.data.storyDate).toString()
                });
                console.log('story user: ', res.data.author)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    updateStatus(e) {
        // send to the backend using PUT request
        const data = {
            storyStatus: e
        };
        axios.put(config.backend + '/stories/' + this.props.match.params.id, data)
            .catch((error) => {
                console.log(error);
            })

        this.setState({
            status: e
        });
    }


    // UI
    render() {
        return (<div className="story-details" style={{ marginTop: 30 }}>
            <Card style={{ color: "#000" }}>
                <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>{this.state.text}</Card.Text>
                    {/* <Card.Body>
                        <video  controls>
                            <source src=""></source>
                        </video>
                    </Card.Body> */}

                    <Card.Text>
                        Status: {this.state.status}
                        <Card.Text>
                        </Card.Text>
                        <DropdownButton id="dropdown-basic-button" title='Change Status' style={{ paddingLeft: 10 }}>
                            <Dropdown.Item onClick={() => this.updateStatus("new")}>new</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.updateStatus("interviewing")}>interviewing</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.updateStatus("validated")}>validated</Dropdown.Item>

                        </DropdownButton>
                    </Card.Text>
                </Card.Body>
                {this.state.author &&
                    <Card.Footer className="text-muted">
                        <Card.Text>
                            First Name: {this.state.author.firstName}
                        </Card.Text>
                        <Card.Text>
                            Last Name: {this.state.author.lastName}
                        </Card.Text>
                        <Card.Text>
                            Email: {this.state.author.email}
                        </Card.Text>
                    </Card.Footer>
                }
                <Card.Footer className="text-muted">
                    Submission Date: {this.state.date}
                </Card.Footer>
                <Card.Footer className="text-muted">
                    Story Type: {this.state.type}
                </Card.Footer>
            </Card>
        </div>);
    }
    //
}