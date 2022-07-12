import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import axios from 'axios';
import StoriesRow from './StoriesRow';
import config from '../config'
import Form from 'react-bootstrap/Form';
import {Col } from 'react-bootstrap';
import {Typeahead} from 'react-bootstrap-typeahead';

export default class StoriesList extends Component {
  constructor(props) {
    super(props);

    this.onCheckNew = this.onCheckNew.bind(this);
    this.onCheckInterviewing = this.onCheckInterviewing.bind(this);
    this.onCheckValidated = this.onCheckValidated.bind(this);
    this.onCheckRejected = this.onCheckRejected.bind(this);
    this.onCheckCustom = this.onCheckCustom.bind(this);
    this.onCheckCharacter = this.onCheckCharacter.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.getTitles = this.getTitles.bind(this);

    this.state = {
      stories: [],
      searchTerm: '',
      statusInterviewing: false,
      statusValidated: false,
      statusNew: false,
      statusRejected: false,
      customApparel: false,
      characterCandidate: false,
      isOpen: false
    };
  }

  //fetch all the stories from the database
  componentDidMount() {
    axios.get(config.backend + '/stories')
      .then(res => {
        this.setState({
          stories: res.data
        });
        console.log("retrieving stories")
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  onCheckNew() {
    this.setState({ statusNew: !(this.state.statusNew) });
  }

  onCheckInterviewing() {
    this.setState({ statusInterviewing: !(this.state.statusInterviewing) });
  }

  onCheckValidated() {
    this.setState({ statusValidated: !(this.state.statusValidated) });
  }

  onCheckRejected() {
    this.setState({ statusRejected: !(this.state.statusRejected) });
  }

  onCheckCustom() {
    this.setState({ customApparel: !(this.state.customApparel) });
  }

  onCheckCharacter() {
    this.setState({ characterCandidate: !(this.state.characterCandidate) });
  }

  clearFilters() {
    this.setState({
      statusNew: false,
      statusInterviewing: false,
      statusValidated: false,
      statusRejected: false,
      customApparel: false,
      characterCandidate: false
    });

  }
     
  //return only the stories that match the filter criteria
  applyFilters() {
    return this.state.stories.filter((res) => {
      if (!(this.state.statusNew) && !(this.state.statusInterviewing) && !(this.state.statusValidated) && !(this.state.statusRejected)) {
        return res;
      }
      else if (this.state.statusNew && res.storyStatus === 'new') {
        return res;
      } else if (this.state.statusInterviewing && res.storyStatus === 'interviewing') {
        return res;
      } else if (this.state.statusValidated && res.storyStatus === 'validated') {
        return res;
      }else if(this.state.statusRejected && res.storyStatus === 'rejected'){
        return res;
      }
    }).filter((res) => {
      if (!(this.state.customApparel) && !(this.state.characterCandidate)) {
        return res;
      }
      else if (this.state.customApparel && res.storyType === 'customApparel') {
        return res;
      } else if (this.state.characterCandidate && res.storyType === 'characterCandidate') {
        return res;
      }
    });
  }

  //returns a list of only the titles of the filtered stories
  getTitles() { 
    return this.applyFilters().map((res) => { 
      return res.storyTitle; 
    }); 
  } 

  //map a list of product cards that match the filters
  getStories() {
    return this.applyFilters().filter((res) => {
      if (this.state.searchTerm == "") {
        return res;
      } else if (res.storyTitle.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
        return res;
      }
    }).map((res, i) => {
      return <StoriesRow obj={res} key={i} {...this.props} />;
    });
  }

  render() {
    return (
      <div>
        <h3 style={{ padding: '2rem' }}>Submitted Stories</h3>

        <Col>
          <div>
            <Typeahead style={{ float: 'right' }} placeholder="Search..." onChange={selected => {
              console.log(selected)
              this.setState({ searchTerm: (selected && selected.length !== 0) ? selected[0] : '' })
            }}
              options={this.getTitles()}
            />
          </div>
        </Col>

        <Col>
          <div style={{ textAlign: 'left' }}>
            <Button
              size="sm"
              className="filter-button"
              variant="outline-dark"
              onClick={() => this.setState({ isOpen: !(this.state.isOpen) })}
              aria-controls="collapse-text"
              aria-expanded={this.state.isOpen}
            >
              Filter Stories
            </Button>
          </div>
        </Col>

        <Collapse in={this.state.isOpen}>
          <div id="collapse-text" >
            <Form>
              <div className="storyFilters m-2" style={{ paddingRight: '25px', paddingTop: '10px' }}>
                <p style={{ paddingRight: '25px', fontWeight: 'bold' }}>Status:</p>
                <Form.Check inline
                  label="New"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkNew"
                  onClick={this.onCheckNew}
                  checked={this.state.statusNew}
                />
                <Form.Check inline
                  label="Interviewing"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkInterview"
                  onClick={this.onCheckInterviewing}
                  checked={this.state.statusInterviewing}
                />
                <Form.Check inline
                  label="Validated"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkValidated"
                  onClick={this.onCheckValidated}
                  checked={this.state.statusValidated}
                />
                <Form.Check inline
                  label="Rejected"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkRejected"
                  onClick={this.onCheckRejected}
                  checked={this.state.statusRejected}
                />
              </div>

              <div className="storyFilters m-2" style={{ paddingRight: '0px' }}>
                <p style={{ paddingRight: '25px', fontWeight: 'bold' }}>Apparel Type:</p>
                <Form.Check inline
                  label="Custom Apparel"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkCustom"
                  onClick={this.onCheckCustom}
                  checked={this.state.customApparel}
                />
                <Form.Check inline
                  label="Character Candidate"
                  name="group1"
                  type="checkbox"
                  id="onCheckMarkCharacter"
                  onClick={this.onCheckCharacter}
                  checked={this.state.characterCandidate}
                />
              </div>
            </Form>
            <Button variant="link" onClick={() => this.clearFilters()}>Clear All Filters</Button>
          </div>
        </Collapse>

        <hr style={{ border: '2px solid SlateGray' }}></hr>
        {this.getStories()}
      </div>

    );

  }

}