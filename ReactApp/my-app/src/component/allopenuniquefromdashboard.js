import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 
 import {allopenuniquesurveys,openuniqueemailid} from '../action/getallsavedsurveys'

class openunique extends Component{
    state={
        usreid:1,
        current_survey:{},
        dashboard:true
    }

    componentDidMount()
    {
        API.getOpenUniqueSurvey().then
        ((output) => {
            console.log("In dash board:",output);
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
                <a onClick={() =>{ 

                            console.log("current EMAIL:",localStorage.getItem("email"))
                                        
                                        var payload = {
                                            userid:localStorage.getItem("email"),
                                            current_survey:surveys,
                                            dashboard:true
                                        }


                                      // API call for UUID entry in the call back of set state
                                    API.emailregister(payload).then
                                      ((output) => {
                                          window.open(output.data);
                                           })
                                   }}>Take the survey</a>

                        
                                            
                                            {/* //         console.log('response from server deletefile', res);

                                            //         return res;
                                            //     })
                                            //     .catch(error => {
                                            //         console.log("This is error in API",error);
                                            //         return error;
                                            //     });

                                        // API call for UUID entry in the call back of set state
                                    //     API.emailregister(payload).then
                                    //     ((output) => {
                                    //         window.open(output.data);
                                    //         })
                                    // }}>Take the survey
                                   // </a> */}
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