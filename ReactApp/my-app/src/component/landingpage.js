import React, {Component} from 'react';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {openuniqueemailid} from '../action/getallsavedsurveys'
import * as API from '../api/surveys' 

class lendingpage extends Component{
    state={
        usreid:""
    }

    handleSignOut(){
      localStorage.setItem("email","");
      this.props.history.push("/");
      window.location.reload();
    }

    renderButton(){
      if(localStorage.getItem("email")!=null && localStorage.getItem("email")!="")
      return(
        <div>
          <button className="btn btn-warning" onClick={() =>{ 
            this.props.history.push("/dashboard");
              }}>Dashboard</button>
          <button className="btn btn-warning" onClick={ () =>{this.handleSignOut()}}>signout</button>
        </div>
          )
      else
      return(
        <div>
          <button class="btn btn-outline-primary"  onClick={() =>{ 
            this.props.history.push("/signin");
              }}>Sign in</button>
          <button class="btn btn-outline-primary"  onClick={() =>{ 
                    this.props.history.push("/signup");             
              }}>Sign up</button>
        </div>
          )
    }

    render()
    {
        return(
            <div>
          <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">Welcome to the Survey APE!</h5>
      <div>
        {this.renderButton()}
      
      </div>
    </div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-4">Choose the Survey Option</h3>
      
    </div>

    <div class="container">
      <div class="card-deck mb-3 text-center">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">General Surveys</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>Take the survey</li>
              <li>and help us determining</li>
              <li>the best you want</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary" onClick={() =>{ 
                                      this.props.history.push("/allgeneralsurveys");
                                       
                                   }}>Get Started</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Open Unique Surveys</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>Register / signin to take the survey</li>
              <li>and help us determining</li>
              <li>the best you want</li>
            </ul>
            
            <button type="button" class="btn btn-lg btn-block btn-outline-primary" onClick={() =>{ 
                                      this.props.history.push("/allopenuniquesurveys");
                                       
                                   }}> Get started</button>
                
        </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Close Surveys</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
            <li>Signin to your portal to  take the survey</li>
              <li>and help us determining</li>
              <li>the best you want</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">Contact us</button>
          </div>
        </div>
      </div>
      </div>

<div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
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
        openuniqueemailid : (data) => dispatch(openuniqueemailid(data))
    };
  }


export default withRouter(connect(null, mapDispatchToProps)(lendingpage));
