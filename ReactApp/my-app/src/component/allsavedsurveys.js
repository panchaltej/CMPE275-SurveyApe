import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
// import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
// import Display from './display';
// import Display2 from './display2';

class savedsurveys extends Component{

    render()
    {
        return(
            <div>
           <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2>JAYJAY</h2> 
            <p><button class="btn btn-secondary"
            onClick={() => {
                this.props.history.push("/createsurvey");
            }}>View details &raquo;</button></p>
          </div>
          <div class="col-md-6">
            <h2>Open Surveys</h2>
            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </div>
        </div>

        <hr/>

      </div>
    </div>

     



            )
    }
}


export default (savedsurveys);