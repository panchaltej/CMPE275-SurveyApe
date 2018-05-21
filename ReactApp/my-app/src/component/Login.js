import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';

import VerificationPage from "./VerificationPage";
import  QuestionForm from "./QuestionForm";
import SignUp from "./SignUp";
import Menu from "./menu"
import CreateSurvey from "./createsurvey"
import axios from 'axios';
var marginTopStyle = {
    marginTop: "50px",
};
var paddingTopStyle = {
    paddingTop: "30px",
};
var marginBottomStyle = {
    marginBottom: "25px",
};
var marginTopFormStyle = {
    marginTop: "25px",
};
var imgStyle={

}
var SignUpFormStyle = {
    float: "right",
    fontSize:"85%",
    position:"relative",
    top:"-10px",
    cursor:"pointer"
};

class Login extends Component {

    handleSignUp = () => {
        {
            this.props.history.push("/signup");
        }
    }
    handleLogin = () => {
        {
            var bodyFormData = new FormData();
            // localStorage.setItem("email", document.getElementById("loginUsername").value);
            bodyFormData.set('email', document.getElementById("loginUsername").value);
            bodyFormData.set('password', document.getElementById("loginPassword").value);
            var isValidEmail=true;

                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("loginUsername").value))
                {
                    isValidEmail=true;
                }
                else {
                    alert("You have entered an invalid email address!")
                    isValidEmail=false;
                }

            var currentComponet=this;
                if(isValidEmail==true) {
                    axios({
                        method: 'post',
                        url: 'http://surveyape.us-west-1.elasticbeanstalk.com/login',
                        data: bodyFormData,
                        config: {headers: {'Content-Type': 'application/json'}}
                    })
                        .then(function (response) {
                            //handle success
                            debugger;
                            if (response.status == 200) {
                                localStorage.setItem("email", document.getElementById("loginUsername").value);
                                if (response.data.isVerified == "N") {
                                    currentComponet.props.history.push("/verificationpage");
                                }
                                else {
                                    currentComponet.props.history.push("/dashboard");
                                }
                            }
                            else {
                                currentComponet.props.history.push("/failedlogin");
                            }

                            console.log(response);
                        })
                        .catch(function (response) {
                            //handle error
                            debugger;
                            currentComponet.props.history.push("/failedlogin");
                            console.log(response);
                        });
                }
        }

    }

    render() {
        return (
            <div >
                <Route exact path="/signin" render={() => (
                    <div className="startUpClass">

                        <div id="loginbox" style={marginTopStyle} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-info" >
                                <div className="panel-heading">
                                    <div className="panel-title">Login to SurveyApe</div>
                                    <div style={SignUpFormStyle}>
                                        <a id="signinlink" onClick={ () =>{this.handleSignUp()}}>Sign up here</a>
                                    </div>
                                </div>

                                <div style={paddingTopStyle} className="panel-body" >




                                        <div style={marginBottomStyle} className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                                            <input id="loginUsername" type="text" className="form-control" name="username"  placeholder="Enter Email Id"/>
                                        </div>

                                        <div style= {marginBottomStyle} className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                            <input id="loginPassword" type="password" className="form-control" name="password" placeholder="Password"/>
                                        </div>

                                        <div style={marginTopFormStyle} className="form-group">
                                            <div className="col-sm-12 controls">
                                                <a id="btn-login" className="btn btn-success" onClick={ () =>{this.handleLogin()}}>Login  </a>
                                            </div>
                                        </div>

                                </div>

                            </div>
                        </div>
                    </div>
                )}/>

                {/* <Route exact path="/successlogin" render={() => (<BrowserRouter>
                    <QuestionForm/>
                </BrowserRouter>
                    )}/> */}
                <Route exact path="/verificationpage" render={() => (<BrowserRouter>
                        <VerificationPage/>
                    </BrowserRouter>
                )}/>
                <Route exact path="/failedlogin" render={() => (
                    <div>
                    <h6 className="welcomeTxt">Login Failed</h6>
                    <a href={"http://localhost:3000"}>Click here to navigate back</a>
                    </div>

                )}/>
                <Route exact path="/signup" render={() => (<BrowserRouter>
                        <SignUp/>
                    </BrowserRouter>
                )}/>

                <Route exact path="/dashboard" render={() => (
                    <div>
                        <Menu/>
                    </div>

                )}/>

                <Route exact path="/createsurvey" render={() => (<BrowserRouter>
                        <CreateSurvey/>
                    </BrowserRouter>
                )}/>

            </div>
        );
    }
}

export default withRouter(Login);