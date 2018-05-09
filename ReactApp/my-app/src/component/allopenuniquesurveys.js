import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 
 import {allopenuniquesurveys,openuniqueemailid} from '../action/getallsavedsurveys'

class openunique extends Component{
    state={
        usreid:"",
        current_survey:{},
        dashboard:false
    }

    componentDidMount()
    {
        API.getOpenUniqueSurvey().then
        ((output) => {
            console.log(output);
            this.props.allopenuniquesurveys(output)
             }) ; 
    }

    fetch_all_open_unique_surveys()
    {
        if(this.props.getallopenuniquesurveys.length > 0){
            return this.props.getallopenuniquesurveys.map((surveys,index) =>{
                return(

                    <div class="media text-muted pt-3">
            <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"/>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">Survey Name</strong>
                <a href="#" data-toggle="modal" data-target="#settings" onClick={() =>{ 
                                        
                                        this.setState({
                                            current_survey: surveys
                                            
                                        });
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
          <h6 class="mb-0 text-white lh-100">Open Unique Surveys</h6>
          <small>Survey APE!</small>
        </div>
      </div>

     <div class="my-3 p-3 bg-white rounded box-shadow">
        <h6 class="border-bottom border-gray pb-2 mb-0" align="left">All Surveys</h6>

        {this.fetch_all_open_unique_surveys()}
       
      </div>
    </main>
    <div class="modal" id="settings"  role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">

                                <div class="modal-content">
                                <div class="modal-header">
                                    <h3 class="modal-title">Choose Option</h3>
                                </div>
                                <div class="modal-body">
                                   <h2> Register for the survey</h2>
                                   <input type="text"
                                          id="from-place"
                                          placeholder="Enter Email ID"
                                          value={this.state.usreid}
                                          onChange={(event) => {
                                                               this.setState({
                                                                usreid: event.target.value
                                                                   
                                                               });}
                                                           }
                                                    />
                                   <button type="button" class="btn btn-lg btn-block btn-primary" data-dismiss="modal"  onClick={() =>{ 
                                       this.props.openuniqueemailid(this.state);
                                       console.log("current_survey:"+this.state.current_survey);
                                       // API CALL
                                      //this.props.history.push("/allopenuniquesurveys");
                                      API.registerEmailForOpenUnique(this.state).then
                                      ((output) => {
                                          console.log(output);
                                           }) ; 
                                      
                                       
                                   }}>Submit</button>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
    </div>
 )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        allopenuniquesurveys : (data) => dispatch(allopenuniquesurveys(data)),
        openuniqueemailid : (data) => dispatch(openuniqueemailid(data))
    };
  }

  function mapStateToProps(state){
    return {
        getallopenuniquesurveys: state.getallopenuniquesurveys
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(openunique));