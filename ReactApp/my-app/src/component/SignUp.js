import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from "./Login";
import VerificationPage from "./VerificationPage"
import Menu from "./menu"
import axios from 'axios';

var marginTopStyle = {
    marginTop: "50px",
};
var LoginFormStyle = {
    float: "right",
    fontSize:"85%",
    position:"relative",
    top:"-10px",
    cursor:"pointer"
};
var marginBottomStyle = {
    marginBottom: "25px",
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: "signup"};
    }
    handleLogin = () => {
        {
            this.props.history.push("/signin");
        }
    }

    handleSignUp = () => {
        {
            var bodyFormData = new FormData();
            // localStorage.setItem("email", document.getElementById("signUpEmail").value);
            bodyFormData.set('email', document.getElementById("signUpEmail").value);
            bodyFormData.set('firstName', document.getElementById("signUpFirstName").value);
            bodyFormData.set('password', document.getElementById("signUpPassword").value);
            var isValidEmail=true;

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("signUpEmail").value))
            {
                isValidEmail=true;
            }
            else {
                alert("You have entered an invalid email address!")
                isValidEmail=false;
            }
            var currentComponet = this;
            if(isValidEmail==true) {
                axios({
                    method: 'post',
                    url: 'http://surveyape.us-west-1.elasticbeanstalk.com/signup',
                    data: bodyFormData,
                    config: {headers: {'Content-Type': 'application/json'}}
                })
                    .then(function (response) {
                        //handle success
                        debugger;
                        if (response.status == 208) {
                            alert("The email is already registered")
                        }
                        else {
                            localStorage.setItem("email", document.getElementById("signUpEmail").value);
                            this.setState({
                                currentPage: "verificationpage"
                            });
                            this.props.history.push("/verificationpage");
                            console.log(response);
                        }
                    }.bind(this))
                    .catch(function (response) {
                        //handle error
                        debugger;
                        this.props.history.push("/failedSignUp");
                        console.log(response);
                    }.bind(this));
            }
        }
    }


    render() {
 // if(this.state.currentPage=="verificationpage")
 // {
 //     return(
 //         <div className="container-fluid">
 //             <VerificationPage/>
 //         </div>
 //     )
 // }
        return (
            <div className="container-fluid">
                <Route exact path="/signup" render={() => (<BrowserRouter>
                    <div className="startUpClass">

                        <div id="signupbox" style={marginTopStyle} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <div className="panel-title">Sign Up</div>
                                    <div style={LoginFormStyle}>
                                        <a id="signinlink" onClick={ () =>{this.handleLogin()}}>Login</a>
                                    </div>
                                </div>
                                <div className="panel-body" >

                                    <div style={marginBottomStyle} className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                        <input id="signUpEmail" type="text" className="form-control" name="username" placeholder="Email for registration"/>
                                    </div>

                                    <div style= {marginBottomStyle} className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input id="signUpFirstName" type="text" className="form-control" name="name" placeholder="First Name"/>
                                    </div>

                                    <div style= {marginBottomStyle} className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                        <input id="signUpPassword" type="password" className="form-control" name="password" placeholder="Password"/>
                                    </div>




                                    <div className="form-group">

                                        <div className="col-md-offset-3 col-md-9">
                                            <button id="btn-signup" onClick={ () =>{this.handleSignUp()}} type="button" className="btn btn-success">  Sign Up</button>
                                        </div>
                                    </div>

                                </div>
                            </div>




                        </div>
                    </div>
                </BrowserRouter>
                )}/>

                <Route exact path="/verificationpage" render={() => (<BrowserRouter>
                   <VerificationPage/>
                </BrowserRouter>
                    )}/>
                <Route exact path="/signin" render={() => (<BrowserRouter>
                        <Login/>
                    </BrowserRouter>
                )}/>
                <Route exact path="/dashboard" render={() => (
                    <div>
                        <Menu/>
                    </div>

                )}/>
            </div>
        );
    }
}

export default withRouter(SignUp);