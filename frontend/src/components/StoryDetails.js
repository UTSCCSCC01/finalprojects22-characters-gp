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
        title: 'Story Title',
        text: 'Character went through this, buy the shirt if you want to support them',
        status: 'New'
      }
    }

    //access the db to fetch the data to display    

    componentDidMount() {
        axios.get(config.backend+'/items/story-details/' + this.props.match.params.id)
          .then(res => {
            this.setState({
              title: res.data.title, 
              text: res.data.text,
              status: res.data.status
            });
          })
          .catch((error) => {
            console.log(error);
          })
    }

    updateStatus(s) {
        // this.setState({status: {s}});

        // send to the backend using PUT request
    }

    // UI
    render() {
        return (<div className="story-details" style={{ marginTop: 30 }}>
            <Card style={{ color: "#000"}}>
              <Card.Body>
                    <Card.Title>{this.state.title}</Card.Title>
                    <Card.Text>{this.state.text}</Card.Text>
                    <Card.Body>
                        <video  controls>
                            <source src=""></source> 
                        </video>
                    </Card.Body>
                    <Card.Text>
                        Status: {this.state.status}
                    <Card.Text>
                    </Card.Text>
                        <DropdownButton id="dropdown-basic-button" title='Change Status' style={{paddingLeft: 10}}>
                          <Dropdown.Item onSelect={this.updateStatus('New')}>New</Dropdown.Item>
                          <Dropdown.Item onSelect={this.updateStatus('Interviewing')}>Interviewing</Dropdown.Item>
                          <Dropdown.Item onSelect={this.updateStatus('Validated')}>Validated</Dropdown.Item>
                        </DropdownButton>
                    </Card.Text>
                </Card.Body>
                <Card.Body className='d-flex align-items-end flex-column bd-highlight'>
                    <Button variant='primary' className='p-2 bd-highlight'>Next Story</Button>
                </Card.Body>
            </Card>
        </div>);
    }
    //
}