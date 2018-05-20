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

    state={"stats":{}}

    componentWillMount(){
        var payload = {
            surveyId : localStorage.getItem("survey_id")
        }
        statsAPI.getStats(payload)
        .then((obj) => {
            
            this.setState({
                "stats": obj
            });
        });
    }

    renderQuestions(){
        if(this.state.stats.questions){
            return this.state.stats.questions.map((que) => {
                if(que.question_type == "TB" || que.question_type == "DT"){
                    return(
                    <div class="table-responsive">
                        <h5>{que.question_text}</h5>
                        {que.answers.map((option)=>{
                            return(
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>{option.answerDescription}</td>
                                        {/* <td>{option.count}</td> */}
                                    </tr>
                                </tbody>
                            </table>
                            );
                        }
                        )}
                    </div>
                    )
                }
                else if(que.question_type == "ST"){
                    var temp = [0,0,0,0,0]
                    return(
                    <div class="table-responsive">
                        <h5>{que.question_text}</h5>
                        {que.answers.map((option)=>{
                            if(option.answerDescription == "1"){
                                temp[0] = temp[0] + 1
                            }
                            if(option.answerDescription == "2"){
                                temp[1] = temp[1] + 1
                            }
                            if(option.answerDescription == "3"){
                                temp[2] = temp[2] + 1
                            }
                            if(option.answerDescription == "4"){
                                temp[3] = temp[3] + 1
                            }
                            if(option.answerDescription == "5"){
                                temp[4] = temp[4] + 1
                            }
                        })}
                        
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>1-star</td>
                                        <td>{temp[0]}</td>
                                        {/* <td>{option.count}</td> */}
                                    </tr>
                                    <tr>
                                        <td>2-star</td>
                                        <td>{temp[1]}</td>
                                    </tr>
                                    <tr>
                                        <td>3-star</td>
                                        <td>{temp[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>4-star</td>
                                        <td>{temp[3]}</td>
                                    </tr>
                                    <tr>
                                        <td>5-star</td>
                                        <td>{temp[4]}</td>
                                    </tr>
                                </tbody>
                            </table>
                            );
                        
                        
                    </div>
                            
                    )
                }
                else{
                return(
                    <div class="table-responsive">
                        <h5>{que.question_text}</h5>
                        {que.options.map((option)=>{
                            return(
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>{option.option_description}</td>
                                        <td>{option.count}</td>
                                    </tr>
                                </tbody>
                            </table>
                            );
                        }
                        )}
                    </div>
                );
            }
            });
        }   
    }

    renderstartDate(){
        if(this.state.stats.startTime){
            return(
                <p>{new Date(this.state.stats.startTime)+""}</p>
        );}
    }

    renderendDate(){
        if(this.state.stats.endTime){
            return(
                <p>{new Date(this.state.stats.endTime)+""}</p>
            );
        }
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

                            <form>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-2 col-form-label">Start Time</label>
                                    <div class="col-sm-10">
                                    <label for="staticEmail">{this.renderstartDate()}</label>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">End Time</label>
                                    <div class="col-sm-10">
                                    <label for="inputPassword">{this.renderendDate()}</label>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label"># of participants</label>
                                    <div class="col-sm-10">
                                    <label for="inputPassword">{this.state.stats.numOfParticipants}</label>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Participation Rate</label>
                                    <div class="col-sm-10">
                                    <label for="inputPassword">{this.state.stats.participationRate*100+"%"}</label>
                                    </div>
                                </div>
                            </form>
                            
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