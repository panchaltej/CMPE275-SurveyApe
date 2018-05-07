import React, {Component} from 'react';
import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {openuniqueemailid} from '../action/getallsavedsurveys'

class lendingpage extends Component{
    state={
        usreid:""
    }
    render()
    {
        return(
            <div>
          <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 class="my-0 mr-md-auto font-weight-normal">Survey APE!</h5>
      <a class="btn btn-outline-primary" href="#">Sign in</a>
      <a class="btn btn-outline-primary" href="#">Sign up</a>
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
            <h1 class="card-title pricing-card-title">$0 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">Sign up for free</button>
          </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Open Unique Surveys</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$15 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>20 users included</li>
              <li>10 GB of storage</li>
              <li>Priority email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary" data-toggle="modal" data-target="#settings"> Get started</button>
            
                    <div id="settings" class="modal fade" role="dialog">
                            <div class="modal-dialog" >

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
                                   <button type="button" class="btn btn-lg btn-block btn-primary"  onClick={() =>{ 
                                       this.props.openuniqueemailid(this.state)
                                       this.props.history.push("/allopenuniquesurveys");
                                   }}>Submit</button>

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                            </div>
                
        </div>
        </div>
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">Close Surveys</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">$29 <small class="text-muted">/ mo</small></h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>30 users included</li>
              <li>15 GB of storage</li>
              <li>Phone and email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary">Contact us</button>
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
