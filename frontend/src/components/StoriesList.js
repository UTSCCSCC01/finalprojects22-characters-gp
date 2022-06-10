import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StoriesRow from './StoriesRow';
import config from '../config'

export default class StoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        axios.get(config.backend+'/stories')
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

      getStories(){
        return this.state.stories.map((res, i) => {
            return <StoriesRow obj={res} key={i} {...this.props} />;
        });
      }

      render(){
          return(
            <div>
                {this.getStories()}
            </div>
            
          );

      }
}