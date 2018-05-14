import React, {Component} from 'react';

// import {removemenu} from '../actions/index';
 //import {connect} from 'react-redux';
 import { Route, Link,Switch,withRouter } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
// import Display from './display';
// import Display2 from './display2';
 import Createsurvey from './createsurvey';
 import Allsavedsurveys from './allsavedsurveys';
 import Landingpage from './landingpage'
 import Openuniquesurvey from './allopenuniquesurveys'
 import Allopenfromdashboard from './allopenuniquefromdashboard'
let initialState=true;
class menu extends Component{
    handleSignOut(){
        localStorage.setItem("email","");
        this.props.history.push("/");
        window.location.reload();
    }
    render()
    {
        return(
            <div>

            <Route exact path="/dashboard" render={() => (

            <div>

                
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="#">Hi,{localStorage.getItem("email")}!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>

      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#"> <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#"></a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#"></a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div className="dropdown-menu" aria-labelledby="dropdown01">
              <a className="dropdown-item" href="#"></a>
              <a className="dropdown-item" href="#"></a>
              <a className="dropdown-item" href="#"></a>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-warning" onClick={ () =>{this.handleSignOut()}}>signout</button>
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <main role="main">

      <div className="jumbotron">
        <div className="container">
          <button className="display-3" style = {{"background":"transparent", border:"0px"}} onClick={() =>{ 
            this.props.history.push("/");
              }}>Survey APE!</button>
        </div>
      </div>


      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Create Survey</h2> 
            <p><button className="btn btn-secondary"

            onClick={() => {
              localStorage.setItem("initial",'true');
                this.props.history.push("/createsurvey");
            }}>GO &raquo;</button></p>
          </div>
          <div className="col-md-4">
            <h2>Saved Surveys</h2>
            <p><button className="btn btn-secondary"
            onClick={() => {
              localStorage.setItem("initial",'false');
                this.props.history.push("/allsavedsurveys");
            }}> GO &raquo;</button></p>
          </div>
          <div className="col-md-4">
            <h2>Open Surveys</h2>
            <p><button class="btn btn-secondary" role="button"  onClick={() => {
                this.props.history.push("/allopenfromdashboard");
            }}>GO &raquo;</button></p>
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

      <Route exact path="/landingpage" render={() => (
                <div>
                    <Landingpage/>
                </div>
            )}/>

      <Route exact path="/allopenuniquesurveys" render={() => (
                <div>
                    <Openuniquesurvey/>
                </div>
            )}/>
                <Route exact path="/" render={() => (
                    <div>
                        <Landingpage/>
                    </div>
                )}/>
      <Route exact path="/allopenfromdashboard" render={() => (
                <div>
                    <Allopenfromdashboard/>
                </div>
            )}/>
    </div>
     
)






            
    }
}


export default withRouter(menu);

