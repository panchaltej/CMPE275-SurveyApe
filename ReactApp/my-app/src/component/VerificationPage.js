// https://codepen.io/nirarazi/pen/ZGovQo

import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import  QuestionForm from "./QuestionForm";
import  Menu from "./menu";
import SignUp from "./SignUp";
var wrapperStyle = {
    fontFamily: "Lato",
fontSize: "1.5rem",
textAlign: "center",
boxSizing: "border-box",
color: "#333"
};

var dialogStyle = {
    border: "solid 1px #ccc",
margin: "10px auto",
padding: "20px 30px",
display: "inline-block",
boxShadow: "0 0 4px #ccc",
backgroundColor: "#FAF8F8",
overflow: "hidden",
position: "relative",
maxWidth: "450px"
};
var inputStyle = {
    margin: "0 5px",
textAlign: "center",
lineHeight: "80px",
fontSize: "35px",
border: "solid 1px #ccc",
boxShadow: "0 0 5px #ccc inset",
outline: "none",
width: "20%",
transition: "all .2s ease-in-out",
borderRadius: "3px",
    width: "30px",
height: "40px",
marginLeft: "15px"
};
var marginTopFormStyle = {
    marginTop: "25px",
};
var buttonStyle={
    display: "inherit",
marginLeft: "120px",
height: "30px",
marginTop: "10px",
textAlign: "center",
padding: "0px",
    width:"70px"
}

class VerificationPage extends Component {






    verificationCheck = () => {
        {
            var bodyFormData = new FormData();
            var verificationCode=document.getElementById("text1").value + document.getElementById("text2").value +
                document.getElementById("text3").value + document.getElementById("text4").value
            bodyFormData.set('verificationCode', verificationCode);
            bodyFormData.set('email',localStorage.getItem("email"))
            var currentComponet=this;
            axios({
                method: 'post',
                url: 'http://surveyape.us-west-1.elasticbeanstalk.com/verificationCheck',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then(function (response) {
                    //handle success
                    if(response.status==200)
                    this.props.history.push("/dashboard");
                    else
                        this.props.history.push("/failedVerification");
                    console.log(response);
                }.bind(this))
                .catch(function (response) {
                    //handle error
                    debugger;
                    this.props.history.push("/failedVerification");
                    console.log(response);
                }.bind(this));
        }

    }

    render() {
        return (
            <div >


                <Route exact path="/verificationpage" render={() => (
                    <div id="wrapper" style={wrapperStyle}>
                        <div id="dialog" style={dialogStyle}>

                            <h6>Please enter the 4-digit verification code we sent via email:</h6>

                            <div id="form">
                                <input type="text" id="text1" style={inputStyle} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="text" id="text2" style={inputStyle} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="text" id="text3" style={inputStyle} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <input type="text" id="text4" style={inputStyle} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
                                <button className="btn btn-success" onClick={() =>{this.verificationCheck()}} style={buttonStyle}>Verify</button>
                            </div>
                        </div>
                    </div>
                )}/>
                {/* <Route exact path="/successlogin" render={() => (<BrowserRouter>
                        <QuestionForm/>
                    </BrowserRouter>
                )}/> */}
                <Route exact path="/dashboard" render={() => (<BrowserRouter>
                        <Menu/>
                    </BrowserRouter>
                )}/>
                <Route exact path="/failedVerification" render={() => (<BrowserRouter>
                    <div>
                        <h6 className="welcomeTxt">verification failed</h6>
                        <a href={"http://janhudesai-ape.herokuapp.com"}>Click here to navigate back</a>
                    </div>
                </BrowserRouter>
            )}/>
            </div>
        );
    }
}

export default withRouter(VerificationPage);