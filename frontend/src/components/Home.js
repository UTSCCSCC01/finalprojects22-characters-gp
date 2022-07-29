import React, { Component } from 'react';
import { Row, Form, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Ratio } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
      return (
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>

          <div className="intro" >
            <h2 className="title" style={{ paddingTop: '30vh' }}>CHARACTERS</h2>
            <p>_______________</p>
            <h4 className="pt-2">Capitalize on your Struggle</h4>
          </div>
          <hr style={{ border: '2px solid SlateGray' }}></hr>
          <Card className="aboutUs border-white" >
            <p style={{ fontSize: '45px', textAlign: 'center' }}>Who We Are</p>
            <Card.Body>
              <Card.Text style={{ fontSize: '125%', textAlign: 'justify', textJustify: 'inter-word' }}>
                Characters is a story telling platform that allows consumers to tell their stories through the medium of clothing.
                This methodology allows consumers to have a holistic engagement with their garments like a superhero
                putting on their costume. The clothing design will be based on real life stories of people in the
                community who have demonstrated great “character” in the face of adversity.
              </Card.Text>

            </Card.Body>
          </Card>

          <hr style={{ border: '2px solid SlateGray' }}></hr>
          <p style={{ textAlign: 'center', fontSize: '45px', paddingRight: '30px' }}>Have a story to Tell?</p>
          <p style={{ textAlign: 'center', fontSize: '30px', paddingRight: '30px' }}>Get Started with 3 Simple Steps</p>
          <Row className='mx-5' xs={1} md={5} >
            <Col>
              <Card className="border-white">
                <Card.Img variant="top" src={"/uploads/sign-up-v2-2.png"} />
                <Card.Body>
                  <Card.Title>1. Sign Up</Card.Title>
                  <Card.Text>
                    Register for a Characters account, this allows you to submit your story,
                    and buy from our existing apparel.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
            <Col>
              <Card className="border-white">
                <Card.Img variant="top" src={"/uploads/submit-story.png"} />
                <Card.Body>
                  <Card.Title>2. Share Your Story</Card.Title>
                  <Card.Text>
                    Share your story with our team by filling out the form located on our website
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col></Col>
            <Col>
              <Card className="border-white">
                <Card.Img variant="top" src={"/uploads/interview.png"} />
                <Card.Body>
                  <Card.Title>3. Interview</Card.Title>
                  <Card.Text>
                    Once our hard working team has reviewed your story, you will be contacted and invited to be 
                    further interviewed so that we can accurately represent your story.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr style={{ border: '2px solid SlateGray' }}></hr>

          <Card className="aboutUs border-white">
            <p style={{ textAlign: 'center', fontSize: '45px' }}>Our Mission</p>
            <Card.Body>

              <Card.Text style={{ fontSize: '125%', textAlign: 'justify', textJustify: 'inter-word' }}>
                Our why is sculpted around giving voice to the voiceless, uncovering hidden figures of our community
                that deserve our admiration, support, and recognition for their heroic acts or unbreakable resilience.
                Why would someone purchase our product over another? Well, it’s because our product is beyond a product,
                it is a symbolic sign of resilience and fight. Not only that, by purchasing our product you are not only
                benefiting yourself but benefiting those who the story belongs to or the community that the theme is built on.
              </Card.Text>
            </Card.Body>
          </Card>

          <hr style={{ border: '2px solid SlateGray' }}></hr>

          <Row>
            <Col>
              <img style={{ height: "80%" }} src={"/uploads/shop-icons-v2.png"} />
            </Col>
            <Col>
              <Card className="mt-5 border-white">
                <Card.Body>
                  <p style={{ fontFamily: "AppleGothic", fontSize: "50px" }}>SHOP </p>
                  <p style={{ fontFamily: 'Papyrus', fontSize: "50px" }}>APPAREL</p>
                  <Link to="/ProductStore" replace><Button className="mt-5" size="lg" variant="secondary" onClick={this.onClickShop()}>Shop Now</Button></Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr style={{ border: '2px solid SlateGray' }}></hr>

          <h3 className="questions">Questions?</h3>
          <Row>
            <Col>
              <p style={{ fontSize:"20px", float: 'right', paddingBottom: '6vh' }}>Dont hesitate to </p>
            </Col>
            <Col>
              <Link style={{float:"left"}} to="/contactUs" replace>Contact Us</Link>
            </Col>
          </Row>
        </Container>


      );

  }
}