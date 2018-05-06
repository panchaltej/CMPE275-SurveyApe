import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
 import * as API from '../api/surveys' 
 import {allsavedsurveys,selectedsurvey} from '../action/getallsavedsurveys'

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
      return this.props.getallsavedsurveys.map((surveys,index) =>{
      //  let temp=[];
      //  for(let i=0;i<this.props.getallsavedsurveys.length();i++){
      //     temp.push(<div key={i}>
      //       <h2>jay</h2>
  
      //     <h2> {this.props.getallsavedsurveys[i].survey_name}</h2>
          
      //     </div>);
      //  } 

        
      // return temp; 
      return(<div>

        {surveys.survey_name}
        <button class="btn btn-secondary"
            onClick={() => {
              this.props.selectedsurvey(surveys)
                this.props.history.push("/createsurvey");
            }}>View</button>
      </div>   )
      })
    }
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
          <div>
          {this.dispaly_all_surveys()}
          </div>
        </div>

        <hr/>

      </div>
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