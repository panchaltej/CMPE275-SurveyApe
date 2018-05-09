import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Route, withRouter } from 'react-router-dom';
import Login from "./Login";
import SignUp from "./SignUp";
import VerificationPage from "./VerificationPage"
import QuestionForm from "./QuestionForm"
import Menu from "./menu"
import Createsurvey from './createsurvey';
import Allsavedsurveys from './allsavedsurveys';
import Openuniquesurvey from './allopenuniquesurveys';
import Landingpage from './landingpage';
import * as statsAPI from '../api/stats' 

class Stats extends Component {

    state={}

    componentWillMount(){
        var payload = {
            surveyId : "2"
        }
        statsAPI.getStats(payload)
        .then((obj) => {
            console.log(obj);
            this.setState(obj);
        });
    }

    renderQuestions(){
        return this.state.questions.map((s) => {
            return(
                <div class="table-responsive">
                    <h4>{s.questionname}</h4>
                    {s.options.map((option)=>{
                        return(
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td>{option.name}</td>
                                    <td>{option.count}</td>
                                </tr>
                            </tbody>
                        </table>
                        );
                    }
                    )}
                </div>
            );
        });
    }

    render() {
        const style = { padding: '0', margin:'0'}
        return (
            <div style = {style}>
                <Route exact path="/stats" render={() => (
                    <div style = {style}>
                        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Survey Ape</a>
                        </nav>

                        <div class="container-fluid" >
                        <div class="row">
                            <main role="main" class="pt-3 px-4">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center border-bottom">
                                <h1 class="h2">Survey Stats</h1>
                            </div>

                            <canvas width="1000" height="0"></canvas>

                            <h4>Questions</h4>
                            {this.renderQuestions()}
                            </main>
                        </div>
                        </div>
                    </div>
                )}/>
                <Route exact path="/createsurvey" render={() => (
                    <div>
                        <Createsurvey/>
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
            </div>
        );
    }  
}

function mapStateToProps(state){
}

function mapDispatchToProps(dispatch){
  }

export default Stats;