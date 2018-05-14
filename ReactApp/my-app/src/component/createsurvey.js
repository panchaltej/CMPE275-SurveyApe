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
        is_closed:false,
        is_published:false,
        closed_invitees:[],
        question:[],
        end_time:"",
        surveytypes:[
            {value: 'G',label:'General'},
            {value: 'O',label:'Open'},
            {value: 'C',label:'Closed'}
            ],
        options:[
            { value: 'DR', label: 'MCQ-Single Text Dropwdown type' },
            { value: 'R', label: 'MCQ-Single Text Radio type' },
            { value: 'I', label: 'MCQ-Single Image Radio type' },
            { value: 'CB', label: 'MCQ-Multiple Text answers' },
            { value: 'MCQ-Multiple Image answers', label: 'MCQ-Multiple Image answers' },
            { value: 'Y', label: 'Yes/no' },
            { value: 'TB', label: 'Short answer' },
            { value: 'DT', label: 'Date/time' },
            { value: 'ST', label: 'Star rating' },
        ],
        images:[]
    };

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    };


    addQuestion(qType){
        console.log(qType);
        let options=[];
        if(qType==="Y") {
            for(let i=0;i<2;i++){
                options.push({"option_description":"","image_description":""});
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
        let question=this.state.question;
        //alert(this.state.question[index].question_type);
        // if(this.state.question.length > 0){
        for (let i = 0; i < this.state.question[index].options.length; i++) {
            if(this.state.question[index].question_type!=="I") {
                options.push(<div key={i}><br/><input style={{width: "300px"}} disabled={this.state.is_published}
                                                      onChange={(e) => this.setOptionName(index, i, e)}
                                                      value={this.state.question[index].options[i].option_description}
                                                      placeholder={'Option ' + (i + 1)}/>
                    <button disabled={this.state.is_published} onClick={() => this.deleteOption(index, i)}>Delete</button>
                    <br/></div>);
            }
            else{ //for images
                // let reader  = new FileReader();
                // let temp="";
                // if(this.state.question[index].options[i].option_description!==""){
                //     reader.onloadend = function () {
                //         temp=new Buffer(reader.result).toString('base64'); //this is an ArrayBuffer
                //         question[index].options[i].image_description=temp;
                //     };
                //     reader.readAsArrayBuffer(this.state.question[index].options[i].option_description);
                //     this.setState({question:question});
                // }

                options.push(<div key={i}><br/><input type="file" style={{width: "300px"}} disabled={this.state.is_published}
                                                      onChange={(e)=>this.handleFileUpload(index,i,e)}
                                                      placeholder={'Option ' + (i + 1)}/>
                    {/*<img src={"data:image/jpeg;base64,"+this.state.question[index].options[i].image_description} alt="Mountain View"/>*/}
                    <button disabled={this.state.is_published} onClick={() => this.deleteOption(index, i)}>Delete</button>
                    <br/></div>);
            }
        }
        // }
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
            if(this.state.question[i].question_type==="Y"){ //yes/no
                answers.push(<div key={i}><br/>Q.{i+1}<input style={{width:"300px"}} disabled={this.state.is_published} onChange={(e)=>this.setQuestionName(i,e)} value={this.state.question[i].question_text} placeholder={'Ask question '+(i+1)+' here'} /><button className="btn btn-danger" disabled={this.state.is_published} onClick={()=>this.delete(i)}>Delete</button><br/>{this.showOption(i)}</div>);
            }
            else if(qtype==='R' || qtype==="CB" || qtype==="I" || qtype==="DR"){
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
      //alert(new Date(temp.endTime).toISOString.substring(0,16));
        if(typeof this.props.selectedsavedsurveys.questions != 'undefined' && this.props.selectedsavedsurveys.survey_id!==0 && localStorage.getItem("initial")==='false'){
            //Make API call
            //alert("sgtadsg");
            console.log("check:"+this.props.selectedsavedsurveys.closed_invitees);
            let temp=this.props.selectedsavedsurveys;
            let date=new Date(temp.endTime);
            date.setHours(date.getHours()-7);

            this.setState({end_time:date.toISOString().substring(0,16),user_id:temp.user_id,closed_invitees:[],is_published:temp.ispublished,surveytype:temp.surveytype,survey_id:temp.surveyId,totalQuestions:temp.questions.length,question:temp.questions,survey_name:temp.survey_name});

            //alert(date.toISOString().substring(0,16));
            let abc=date.toISOString().substring(0,16);
            if(abc==="1969-12-31T17:00"){
                abc="";
            }
            this.setState({is_closed:temp.closed,end_time:abc,user_id:temp.user_id,closed_invitees:[],is_published:temp.ispublished,surveytype:temp.surveytype,survey_id:temp.surveyId,totalQuestions:temp.questions.length,question:temp.questions,survey_name:temp.survey_name});


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

          user_id:localStorage.getItem("email"),
            end_time:this.state.end_time,

            survey_id:this.state.survey_id,
            survey_name:this.state.survey_name,
            surveytype:this.state.surveytype,
            is_published:this.state.is_published,
            closed_invitees:closed_invitees.substring(0, closed_invitees.length-1),
            questions:this.state.question
        };
        //console.log(new Buffer(this.state.question[0].options[0].option_description.file).toString('base64'));
        //let fileBuffer = new Buffer(this.state.question[0].options[0].option_description);
        // let reader  = new FileReader();
        //
        // reader.onloadend = function () {
        //     console.log(new Buffer(reader.result).toString('base64')); //this is an ArrayBuffer
        // };
        // reader.readAsArrayBuffer(this.state.question[0].options[0].option_description);
        //console.log(new Buffer(reader.result).toString('base64'));

        API.createSurvey(surveyData).then
            ((output) => {
        console.log(output);
        this.setState({survey_id:output,closed_invitees:[]},()=>console.log(this.state));
      }) ;

        //console.log(this.state.images);
        for(let i=0;i<this.state.images.length;i++){
            API.uploadFile(this.state.images[i])
                .then((res) => {
                    
                });
        }
        
        console.log(surveyData);
    }

    handleFileUpload = (index,i,event) => {
        alert("in images");
        const payload = new FormData();
        //var f = event.target.files[0];
        let temp = this.state.images;
        let question=this.state.question;
        question[index].options[i].option_description=event.target.files[0].name;
        payload.append('mypic', event.target.files[0]);
        temp.push(payload);
        //console.log(f);
        this.setState({images:temp,question:question});

    };

    publish(){
      console.log(this.state.survey_id);
        let closed_invitees='';
        for(let i=0;i<this.state.closed_invitees.length;i++){
            closed_invitees+=this.state.closed_invitees[i]+",";
        }
        console.log("closed_invitees to be sent",closed_invitees.length);

        let surveyData={
            //Change User Id based on LOGIN
            user_id:localStorage.getItem("email"),
            survey_id:this.state.survey_id,
            survey_name:this.state.survey_name,
            surveytype:this.state.surveytype,
            is_published:true,
            closed_invitees:closed_invitees.length>0?closed_invitees.substring(0, closed_invitees.length-1):'',
            questions:this.state.question,
            end_time:this.state.end_time

        };

        console.log("Survey_id:",surveyData)
      API.createSurvey(surveyData).then
          ((output) => {
      console.log(output);
      this.setState({closed_invitees:[]});
   }) ;
        this.setState({is_published:true});
    }
    unPublish(){
        let payload={"survey_id":this.state.survey_id};
        API.unpublish(payload).then
        ((output) => {
            console.log(output);
            if(output.data==="ok") {
                this.setState({is_published: false});
            }
            else{
                alert("Answers are alredy submitted!");
            }
        });
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

    closeSurvey(){
        this.setState({is_closed:true});
        API.closesurvey({"survey_id":this.state.survey_id}).then
        ((output) => {
            console.log(output);
        }) ;
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
    extendTime(){
        let data={
            is_published:this.state.is_published,
            survey_id:this.state.survey_id,
            end_time:this.state.end_time
        };
        console.log("data",data);
        API.updateendtime(data).then
        ((output) => {
            console.log(output);
        }) ;
        
    }

    render(){
        var style = {width: '280px'}
        return(
            <div>
                

<Route exact path="/createsurvey" render={() => (
    <div>

                <div className="container-fluid">
                    <h1>{this.state.is_published?"This survey is now "+(this.state.is_closed?"closed!":"live!"):""}</h1>
                    <button onClick={()=>{
                        localStorage.setItem("survey_id", this.state.survey_id);
                        window.open("http://localhost:3000/stats")}}>View Stats</button>
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
                                                    <button  class="btn btn-primary-outline" disabled={this.state.is_published} onClick={()=>this.addQuestion(item.value)} style={style}>
                                                  
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
                            {this.state.is_published?<button disabled={this.state.is_closed} className="btn btn-warning" onClick={()=>this.unPublish()}>Unpublish</button>:<button onClick={()=>this.save()} className="btn btn-info">Save</button>}<br/><br/>
                            {!this.state.is_published?<button className="btn btn-success" disabled={this.state.totalQuestions===0} onClick={()=>this.publish()}>Publish!</button>:''}<br/><br/>
                            {this.state.surveytype==='C'?<div>Add Invitees<button onClick={()=>this.addInvitee()}>Add email</button><br/>{this.showInvitees()}</div>:''}
                            {this.state.surveytype==='C' && this.state.is_published && this.state.closed_invitees.length>0?<button disabled={this.state.is_closed} onClick={()=>this.addInvitees()} className="btn btn-success">Send Invites</button>:''}
        {/*close button*/}  {this.state.is_published && !this.state.is_closed?<button className="btn btn-warning" onClick={()=>this.closeSurvey()}>End/Close Survey</button>:''}<br/>
                            Choose end date and time:<input onChange={(e)=>this.setState({end_time:e.target.value})} value={this.state.end_time} type="datetime-local"/><br/>
                            {!this.state.is_closed && this.state.is_published?<button onClick={()=>this.extendTime()}>Extend time</button>:""}
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
