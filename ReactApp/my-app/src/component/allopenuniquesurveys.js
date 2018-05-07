import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 

class openunique extends Component{

  render()
    {
        return(
            <div>
           Open Unique Survey
    </div>
 )
    }
}

function mapStateToProps(state){
    return {
      getallsavedsurveys: state.getallsavedsurveys
    }
}

export default withRouter(connect(mapStateToProps, null)(openunique));