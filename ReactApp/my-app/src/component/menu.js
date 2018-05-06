import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 //import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
// import Display from './display';
// import Display2 from './display2';
 import Createsurvey from './createsurvey';
 import Allsavedsurveys from './allsavedsurveys'
let initialState=true;
class menu extends Component{

    render()
    {
        return(
            <div>
            <Route exact path="/" render={() => (
            <div>
                
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <main role="main">

      <div class="jumbotron">
        <div class="container">
          <h1 class="display-3">Hello,User! </h1>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2>Create Survey</h2> 
            <p><button class="btn btn-secondary"
            onClick={() => {
              localStorage.setItem("initial",'true');
                this.props.history.push("/createsurvey");
            }}>GO &raquo;</button></p>
          </div>
          <div class="col-md-4">
            <h2>Saved Surveys</h2>
            <p><button class="btn btn-secondary"
            onClick={() => {
              localStorage.setItem("initial",'false');
                this.props.history.push("/allsavedsurveys");
            }}> GO &raquo;</button></p>
          </div>
          <div class="col-md-4">
            <h2>Open Surveys</h2>
            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </div>
        </div>

        <hr/>

      </div>

    </main>

    

    </div>
    )}/>
    <Route exact path="/createsurvey" render={() => (
                <div>
                    <Createsurvey initial={initialState}/>
                </div>
            )}/>

     <Route exact path="/allsavedsurveys" render={() => (
                <div>
                    <Allsavedsurveys/>
                </div>
            )}/>
    </div>
     
)






            
    }
}


export default withRouter(menu);

