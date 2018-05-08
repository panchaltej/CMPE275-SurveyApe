import  React,{Component} from 'react';
import * as API from '../api/surveys' 
import {connect} from 'react-redux';
import Allsavedsurveys from './allsavedsurveys';
import { Route, Link,Switch,withRouter } from 'react-router-dom';

class HP extends Component{
    state={
        survey_id:0,
        totalQuestions:0,
        user_id:0,
        survey_name:'',
        surveytype:'G',
        is_published:false,
        closed_invitees:[],
        question:[],
        surveytypes:[
            {value: 'G',label:'General'},
            {value: 'O',label:'Open'},
            {value: 'C',label:'Closed'}
            ],
        options:[
            { value: 'R', label: 'MCQ-Single Text answer' },
            { value: 'I', label: 'MCQ-Single Image answer' },
            { value: 'CB', label: 'MCQ-Multiple Text answers' },
            { value: 'MCQ-Multiple Image answers', label: 'MCQ-Multiple Image answers' },
            { value: 'DR', label: 'Yes/no' },
            { value: 'TB', label: 'Short answer' },
            { value: 'DT', label: 'Date/time' },
            { value: 'ST', label: 'Star rating' },
        ]
    };


    addQuestion(qType){
        console.log(qType);
        let options=[];
        if(qType==="DR") {
            for(let i=0;i<2;i++){
                options.push({"option_description":""});
            }
        }
        let temp={"question_text":"","question_type":qType,"options":options};
        let tempState=this.state;
        tempState.question.push(temp);
        this.setState({question:tempState.question,totalQuestions:this.state.totalQuestions+1});
    }

    delete(index){
        console.log("delete pressed for index:",index);
        let temp = this.state.question;
        temp.splice(index,1);
        this.setState({question:temp,totalQuestions:this.state.totalQuestions-1});
    }
    addOption(i){
        let temp={"option_description":""};
        let question=this.state.question;
        console.log(question);
        question[i].options.push(temp);
        this.setState({question:question}); //PENDINGGGGGGGGG
    }
    setOptionName(index,i,e){
        let question=this.state.question;
        question[index].options[i].option_description=e.target.value;
        this.setState({question:question});
    }

    showOption(index) {
        let options = [];
        for (let i = 0; i < this.state.question[index].options.length; i++) {
            options.push(<div key={i}><br/><input style={{width:"300px"}} disabled={this.state.is_published} onChange={(e)=>this.setOptionName(index,i,e)} value={this.state.question[index].options[i].option_description} placeholder={'Option '+(i+1)} /><button disabled={this.state.is_published} onClick={()=>this.deleteOption(index,i)}>Delete</button><br/></div>);

        }
        return options;
    }
    deleteOption(index,i){
        console.log("delete pressed for index:",i);
        let temp = this.state.question;
        temp[index].options.splice(i,1);
        this.setState({question:temp});
    }
    setQuestionName(i,e){
        let question=this.state.question;
        question[i].question_text=e.target.value;
        this.setState({question:question});
    }

    showQuestion(){
        let answers = [];
        for (let i = 0; i < this.state.totalQuestions; i++) {
          //console.log(this.state.question[i]);
          let qtype=this.state.question[i].question_type;
          console.log(qtype);
            if(this.state.question[i].question_type==='DR'){ //yes/no
                answers.push(<div key={i}><br/>Q.{i+1}<input style={{width:"300px"}} disabled={this.state.is_published} onChange={(e)=>this.setQuestionName(i,e)} value={this.state.question[i].question_text} placeholder={'Ask question '+(i+1)+' here'} /><button className="btn btn-danger" disabled={this.state.is_published} onClick={()=>this.delete(i)}>Delete</button><br/>{this.showOption(i)}</div>);
            }
            else if(qtype==='R' || qtype==="I" || qtype==="CB"){
                answers.push(<div key={i}><br/>Q.{i+1}<input style={{width:"300px"}} disabled={this.state.is_published} onChange={(e)=>this.setQuestionName(i,e)} value={this.state.question[i].question_text} placeholder={'Ask question '+(i+1)+' here'} /><button className="btn btn-danger" disabled={this.state.is_published} onClick={()=>this.delete(i)}>Delete</button><br/><button disabled={this.state.is_published} onClick={()=>this.addOption(i)}>Add option</button><br/>{this.showOption(i)}</div>);
            }
            else{
                answers.push(<div key={i}><br/>Q.{i+1}<input style={{width:"300px"}} disabled={this.state.is_published} onChange={(e)=>this.setQuestionName(i,e)} value={this.state.question[i].question_text} placeholder={'Ask question '+(i+1)+' here'} /><button className="btn btn-danger" disabled={this.state.is_published} onClick={()=>this.delete(i)}>Delete</button></div>);
            }
        }
        return answers;
    }



    componentWillMount(){
      console.log("selectedsavedsurveys in componentWillMount:",this.props.selectedsavedsurveys  );
      //alert(this.props.initial);
      console.log(localStorage.getItem("initial")==='false');
        if(typeof this.props.selectedsavedsurveys.questions != 'undefined' && this.props.selectedsavedsurveys.survey_id!==0 && localStorage.getItem("initial")==='false'){
            //Make API call
            //alert("sgtadsg");
            console.log("check:"+this.props.selectedsavedsurveys.closed_invitees);
            let temp=this.props.selectedsavedsurveys;
            this.setState({user_id:temp.user_id,closed_invitees:[],is_published:temp.ispublished,surveytype:temp.surveytype,survey_id:temp.survey_id,totalQuestions:temp.questions.length,question:temp.questions,survey_name:temp.survey_name});
        }
        else{
            //alert("Initializing your survey...");//only for debugging


        }
    }

    

    save(){
        let closed_invitees='';
        for(let i=0;i<this.state.closed_invitees.length;i++){
            closed_invitees+=this.state.closed_invitees[i]+",";
        }
        let surveyData={
          //Change User Id based on LOGIN
          user_id:3,
            survey_id:this.state.survey_id,
            survey_name:this.state.survey_name,
            surveytype:this.state.surveytype,
            is_published:this.state.is_published,
            closed_invitees:closed_invitees.substring(0, closed_invitees.length-1),
            questions:this.state.question
        };

        API.createSurvey(surveyData).then
            ((output) => {
        console.log(output);
      }) ;
        
        console.log(surveyData);
    }

    publish(){
      console.log(this.state.survey_id);
        let closed_invitees='';
        for(let i=0;i<this.state.closed_invitees.length;i++){
            closed_invitees+=this.state.closed_invitees[i]+",";
        }
        console.log("closed_invitees to be sent",closed_invitees.length);

        let surveyData={
            //Change User Id based on LOGIN
            user_id:3,
            survey_id:this.state.survey_id,
            survey_name:this.state.survey_name,
            surveytype:this.state.surveytype,
            is_published:true,
            closed_invitees:closed_invitees.length>0?closed_invitees.substring(0, closed_invitees.length-1):'',
            questions:this.state.question
        };

      API.createSurvey(surveyData).then
          ((output) => {
      console.log(output);
      
   }) ;
        this.setState({is_published:true});
    }
    unPublish(){
        this.setState({is_published:false});
    }

    addInvitee(){
        let invitees=this.state.closed_invitees;
        invitees.push("");
        this.setState({closed_invitees:invitees});
    }

    showInvitees(){
        let temp=[];
        let length=0;
        // if(typeof this.props.selectedsavedsurveys.closed_invitees !== 'undefined'){
        //     length=this.props.selectedsavedsurveys.closed_invitees.split(",").length;
        // }
        //alert(this.state.closed_invitees);
        for(let i=0;i<this.state.closed_invitees.length;i++){
            temp.push(<div key={i}><input disabled={false} onChange={(e)=> {
                let invitee=this.state.closed_invitees;
                invitee[i]=e.target.value;
                this.setState({closed_invitees:invitee});
            }} value={this.state.closed_invitees[i]} placeholder={"Invitee email:"+(i+1)}/></div>);
        }
        return temp;
    }

    createSurveyButton(){
        if(this.state.survey_name==='' || this.state.surveytype===''){
            alert("Cannot be blank");
            return;
        }
        this.props.route('/createSurvey')
    }

    addInvitees(){

        let closed_invitees='';
        for(let i=0;i<this.state.closed_invitees.length;i++){
            closed_invitees+=this.state.closed_invitees[i]+",";
        }
        let invitee_data={"survey_id":this.state.survey_id,"invitees":closed_invitees.length>0?closed_invitees.substring(0, closed_invitees.length-1):''};
        API.addInvitees(invitee_data).then
        ((output) => {
            console.log(output);
        }) ;
    }

    render(){
        return(
            <div>
                

<Route exact path="/createsurvey" render={() => (
    <div>

                <div className="container-fluid">
                    <h1>{this.state.is_published?"This survey is now live!":""}</h1>
                    <h2>Enter survey type:</h2><select disabled={this.state.is_published} onChange={(e)=>this.setState({surveytype:e.target.value})} value={this.state.surveytype}>
                    {this.state.surveytypes.map((e, index) => {
                        return <option key={index} value={e.value}>{e.label}</option>;
                    })}
                </select><br/>
                    <h2>Enter survey name:</h2><input disabled={this.state.is_published} onChange={(e)=>this.setState({survey_name:e.target.value})} value={this.state.survey_name}/><br/>


                    <div className="row">
                        <div className="col-md-3" align="center">
                        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Choose the Question type</a>
                                
                                    </nav>
                                    <div class="container-fluid">
                                        <div class="row">
                                        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                                        <div class="sidebar-sticky">
                                            <ul class="nav flex-column">
                                                {this.state.options.map((item, index) => (
                                                    
                                                    <li class="nav-item">
                                                    <button  class="btn btn-primary-outline" disabled={this.state.is_published} onClick={()=>this.addQuestion(item.value)}>
                                                  
                                                    {item.label} 
                                                    
                                                    
                                                    </button>
                                                    <br/>
                                                    <br/>
                                                    
                                                    </li>
                                                    
                                                ))}
                                                </ul>
                                                {/* {this.state.options.map((item, index) => (
                                <div key={index}><button disabled={this.state.is_published} onClick={()=>this.addQuestion(item.value)} className="btn btn-primary">{item.label}</button><br/><br/></div>
                            ))} */}
                                                </div>
                                                </nav>
                                                </div>
                                                </div>

                                                

                        </div>
                        <div className="col-md-6">
                            {this.showQuestion()}
                        </div>
                        <div className="col-md-3">
                            {this.state.is_published?<button className="btn btn-warning" onClick={()=>this.unPublish()}>Take this survey down</button>:<button onClick={()=>this.save()} className="btn btn-info">Save</button>}<br/><br/>
                            {this.state.totalQuestions>0 && !this.state.is_published?<button className="btn btn-success" onClick={()=>this.publish()}>Go Live!</button>:''}<br/><br/>
                            {this.state.surveytype==='C'?<div>Add Invitees<button onClick={()=>this.addInvitee()}>Add email</button><br/>{this.showInvitees()}</div>:''}
                            {this.state.surveytype==='C' && this.state.is_published && this.state.closed_invitees.length>0?<button onClick={()=>this.addInvitees()} className="btn btn-success">Send Invites</button>:''}
                        </div>
                    </div>
                </div>
            </div>
        )}/>
         <Route exact path="/allsavedsurveys" render={() => (
                <div>
                    <Allsavedsurveys/>
                </div>
            )}/>
        </div>

        );
    }

}

function mapStateToProps(state){
  return {
    selectedsavedsurveys: state.selectedsavedsurveys
  }
}


export default withRouter(connect(mapStateToProps, null)(HP));
