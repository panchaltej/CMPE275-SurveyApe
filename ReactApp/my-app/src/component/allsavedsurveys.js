import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 
 import {allsavedsurveys,selectedsurvey} from '../action/getallsavedsurveys'
 import Createsurvey from './createsurvey';
import Menu from "./menu"
class savedsurveys extends Component{

    componentDidMount()
    {
      //var payload ={}
      API.getSavedSurveys().then
      ((output) => {
        console.log(output);
        this.props.allsavedsurveys(output)
        
      })  
    }

    dispaly_all_surveys()
    {
      console.log("this.props.getallsavedsurveys:"+this.props.getallsavedsurveys)
      if(this.props.getallsavedsurveys.length > 0){
      return this.props.getallsavedsurveys.map((surveys,index) =>{
      return(
      
      // <div key={surveys.survey_id}>

      //   {surveys.survey_name}
      //   <button className="btn btn-secondary"
      //       onClick={() => {
      //         this.props.selectedsurvey(surveys)
      //           this.props.history.push("/createsurvey");
      //       }}>View</button>
      // </div>   
      
      <div class="media text-muted pt-3">
          <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded"/>
          <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <div class="d-flex justify-content-between align-items-center w-100">
              <strong class="text-gray-dark">Survey Name</strong>
              <a  onClick={() => {
              this.props.selectedsurvey(surveys)
                this.props.history.push("/createsurvey");
            }}> Go to the survey</a>
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

            <Route exact path="/allsavedsurveys" render={() => (

                <div>
                <main role="main" class="container">
                <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
                <img class="mr-3" src="https://getbootstrap.com/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48"/>
                <div class="lh-100">
                <h6 class="mb-0 text-white lh-100">All saved surveys</h6>
                <small>Survey APE!</small>
                </div>
                </div>

                <div class="my-3 p-3 bg-white rounded box-shadow">
                <h6 class="border-bottom border-gray pb-2 mb-0" align="left">All Surveys</h6>

                {this.dispaly_all_surveys()}

                </div>
                </main>
                </div>
                 )}/>

                 <Route exact path="/createsurvey" render={() => (
                <div>
                    <Createsurvey/>
                </div>
            )}/>
              <Route exact path="/dashboard" render={() => (
                  <div>
                      <Menu/>
                  </div>
              )}/>
                  </div>
 )
    }
}
  function mapDispatchToProps(dispatch) {
    return {
      allsavedsurveys : (data) => dispatch(allsavedsurveys(data)),
      selectedsurvey : (data) => dispatch(selectedsurvey(data))
    };
  }

  function mapStateToProps(state){
    return {
      getallsavedsurveys: state.getallsavedsurveys
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(savedsurveys));