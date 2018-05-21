import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 
 import {allgeneralsurveys} from '../action/getallsavedsurveys'

class openunique extends Component{
    state={
        usreid:"",
        current_survey:{},
        dashboard:false
    }

    componentDidMount()
    {
        API.getgeneralSurvey().then
        ((output) => {
            console.log(output);
            this.props.allgeneralsurveys(output)
             }) ; 
    }

    fetch_all_open_unique_surveys()
    {
        if(this.props.getgeneralsurveys && this.props.getgeneralsurveys.length > 0){
        return this.props.getgeneralsurveys.map((surveys,index) =>{
            return(

                <div class="media text-muted pt-3">
          <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"/>
          <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <div class="d-flex justify-content-between align-items-center w-100">
              <strong class="text-gray-dark">Survey Name</strong>
              <a onClick={() =>{ 
                                       
                                       this.setState({
                                        current_survey: surveys
                                           
                                       });
                                       window.open("http://janhudesai-ape.herokuapp.com/survey/"+surveys.surveyId+"/general");
                                   }}>Take the survey</a>
            </div>
            <span class="d-block" align="left">{surveys.survey_name}</span>
          </div>
        </div>
                )
              })
            }
    }

  render()
    {
        return(
            <div>
           <main role="main" class="container">
      <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
        <img class="mr-3" src="https://getbootstrap.com/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48"/>
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">General Surveys!</h6>
          <small>Survey APE!</small>
        </div>
      </div>

     <div class="my-3 p-3 bg-white rounded box-shadow">
        <h6 class="border-bottom border-gray pb-2 mb-0" align="left">All Surveys</h6>

        {this.fetch_all_open_unique_surveys()}
       
      </div>
    </main>
    
    </div>
 )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allgeneralsurveys : (data) => dispatch(allgeneralsurveys(data))
    };
  }

  function mapStateToProps(state){
    return {
        getgeneralsurveys: state.getgeneralsurveys
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(openunique));