import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import VerificationPage from "./component/VerificationPage"
import QuestionForm from "./component/QuestionForm"
import Menu from "./component/menu"
import { Route, withRouter } from 'react-router-dom';

var signUpUrlStyle = {
    borderTop:"1px solid#888",
    paddingTop:"15px",
    fontSize:"85%"
};

class App extends Component {
    handleSignUp = () => {
        {
            this.props.history.push("/signup");
        }
    }
    render()
    {
        return (
            <div className="App">
                <div className="container-fluid">

                    <Route exact path="/" render={() => (<BrowserRouter>
                            <div className="startUpClass">

                                <Login/>
                                {/*<div className="form-group">*/}
                                {/*<div className="col-md-12 control">*/}
                                {/*<div style={signUpUrlStyle} >*/}
                                {/*Don't have an account!*/}
                                {/*<a onClick={ () =>{this.handleSignUp()}}>*/}
                                {/*Sign Up Here*/}
                                {/*</a>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                            </div>
                        </BrowserRouter>
                    )}/>

                    <Route exact path="/signup" render={() => (<BrowserRouter>
                            <SignUp/>
                        </BrowserRouter>
                    )}/>
                    <Route exact path="/verificationpage" render={() => (<BrowserRouter>
                            <VerificationPage/>
                        </BrowserRouter>
                    )}/>
                    <Route exact path="/dashboard" render={() => (<BrowserRouter>
                            <Menu/>
                        </BrowserRouter>
                    )}/>
                    <Route exact path="/successfullyVerified" render={() => (<BrowserRouter>
                            <div>verification successfull</div>
                        </BrowserRouter>
                    )}/>
                    <Route exact path="/failedVerification" render={() => (<BrowserRouter>
                            <div>
                                <h6 className="welcomeTxt">verification failed</h6>
                                <a href={"http://localhost:3000"}>Click here to navigate back</a>
                            </div>
                        </BrowserRouter>
                    )}/>
                    <Route exact path="/successlogin" render={() => (<BrowserRouter>
                            <QuestionForm/>
                        </BrowserRouter>
                    )}/>
                </div>
            </div>
        );
    }
}

export default  withRouter(App);