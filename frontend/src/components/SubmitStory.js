import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import config from '../config'

class SubmitForm extends Component {
    constructor(props) {
        super(props);
        //setup SubmitForm methods
        //bind methods to pass to other components
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStoryText = this.onChangeStoryText.bind(this);
        this.onChangeStoryTitle = this.onChangeStoryTitle.bind(this);
        this.onCheckYes = this.onCheckYes.bind(this);
        this.onCheckNo = this.onCheckNo.bind(this);
        this.removeSuccessBox = this.removeSuccessBox.bind(this);
        //this.handleCheckbox = this.handleCheckbox.bind(this);
        //setup SubmitForm state
        this.state = {
            storyText: '',
            storyTitle: '',
            storyType: '',
            submissionSuccess: false
        }


    }

    componentDidMount() {
        const formData = sessionStorage.getItem('submitStoryForm')
        console.log('form', formData)
        if (formData !== null) {
            this.setState(JSON.parse(formData), () => console.log("form2", this.state))
        }
    }

    onSubmit(e) {
        e.preventDefault();
        //If use is not logged-in, then render an alert that tells them to do so,
        if (!this.props.user) {
            sessionStorage.setItem('submitStoryForm', JSON.stringify(this.state))
            console.log("saved form", sessionStorage.getItem('submitStoryForm'))
            this.props.history.push('/signup')
            return;
        }
        //otherwise create new Story submission object and send it to database

        //assume all other state fields are filled (by required attributes)
        const data = {
            storyText: this.state.storyText,
            storyTitle: this.state.storyTitle,
            storyType: this.state.storyType,
            author: this.props.user._id
        }

        //store new object in database and print to console
        axios.post(config.backend + "/stories", data)
            .then(res => {
                sessionStorage.removeItem('submitStoryForm')
                console.log(res.data)
            });

        //reset SubmitForm state
        this.setState({
            storyText: '',
            storyTitle: '',
            storyType: '',
        })
        //change submissionSuccess state to show
        //successful submission message to user:
        this.setState({ submissionSuccess: 'true' });
    }
    onChangeStoryText(e) {
        this.setState({ storyText: e.target.value });
    }
    onChangeStoryTitle(e) {
        this.setState({ storyTitle: e.target.value });
    }
    onCheckYes() {
        this.setState({ storyType: 'customApparel' });
    }
    onCheckNo() {
        this.setState({ storyType: 'characterCandidate' });
    }
    removeSuccessBox(e) {
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <br></br>
                <Form.Group as={Row} controlId="storyText">
                    <center>
                        <Form.Label column sm="10" >
                            Insert instructional debriefing of what details should be included in
                            the story that the user is sharing (ex. a bit about themself, their history,
                            how life was growing up, their financial situation, and so on ... )
                        </Form.Label>
                    </center>
                    <Col sm="12">
                        <Form.Control as="textarea"
                            placeholder="Share your story ..."
                            required
                            rows={8}
                            onChange={this.onChangeStoryText}
                            value={this.state.storyText} />
                    </Col>
                </Form.Group>

                <br></br>
                <Form.Group as={Row} controlId="storyTitle" >
                    <Form.Label column sm="4">
                        What would the title of your story be?
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control required type="text"
                            placeholder="Enter story title here ..."
                            onChange={this.onChangeStoryTitle}
                            value={this.state.storyTitle} />
                    </Col>
                </Form.Group>

                {/* name attribute allows one radiobutton to be active at a time  */}
                <br></br>
                <Form.Group as={Row} required>
                    <Form.Label column sm="4">
                        I am submitting my story for custom-made apparel
                    </Form.Label>
                    <Col sm="1">
                        <Form.Check inline
                            name="checkStoryType"
                            id="onCheckmarkTrue"
                            type="radio"
                            label="Yes"
                            required
                            onClick={this.onCheckYes}
                            defaultChecked={this.state.storyType === "customApparel"}
                        />
                        <Form.Check inline
                            name="checkStoryType"
                            id="onCheckmarkFalse"
                            type="radio"
                            label="No"
                            required
                            onClick={this.onCheckNo}
                            defaultChecked={this.state.storyType === "characterCandidate"}
                        />
                    </Col>
                </Form.Group>

                <br></br>
                <Button size="md" block="block" type="submit">
                    Submit
                </Button>

                {this.state.submissionSuccess == 'true' &&
                    <Alert variant="success" onClose={() => this.setState({ submissionSuccess: false })} dismissible>
                        <Alert.Heading>Your story has been successfully submitted.</Alert.Heading>
                    </Alert>
                }
            </Form>
        )
    }
}


//create form that cosists of storyText field and
export default SubmitForm;