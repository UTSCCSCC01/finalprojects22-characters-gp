import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SubmitForm extends Component {
    constructor(props){
        super(props);
        //setup component functions
        this.handleSubmit = this.handleSubmit.bind(this);

        //setup component state
        this.state = {
            storyTitle: '',
            storyText: '',
            submissionType: ''
        }
    }
    handleSubmit(event){
        return;
        //pass state data to the database 
    }
    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formStoryTitle">
                    <Form.Label>Story Title</Form.Label>
                    <Form.Control type="text" placeholder="Type story title here ..." />
                </Form.Group>

                <Form.Group controlId="formStoryText">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formStoryCheckbox">
                    <Form.Check type="checkbox" 
                    label="I am submitting my story for custom-made apparel" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

    /*
    render(){
        return(
            <div>
                <div className = "container">
                    <form onSubmit={this.handleSubmit} >
                        <label>
                            What story do you have to share with the world? 
                            <input type="text"
                            placeholder="Type your story here ..."
                            onChange={this.changeStoryText}
                            value={this.state.storyText}
                            //utilize bootstrap CSS classes
                            className='form-control form-group'>
                            </input>
                        </label>
                        
                        <label>
                            I am submitting my story for custom-made apparel: 
                            <input type = "checkbox"
                            placeholder = "Yes"
                            onChange={this.changeStoryText}
                            value={this.state.storyText}
                            //utilize bootstrap classes
                            className='form-control form-group'>
                            </input>
                        </label>


                    </form>
                </div>
            </div>

        )

    }
    */
}

//create form that cosists of storyText field and 
export default SubmitForm;