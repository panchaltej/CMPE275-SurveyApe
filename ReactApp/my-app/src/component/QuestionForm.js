// https://codepen.io/nirarazi/pen/ZGovQo

import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import _ from 'lodash';
import * as API from '../api/surveys' 

var jsonData = {};
var resultData=jsonData;

 var id=[];

var wrapperStyle = {
    float: "Left",
    display:"inline-block"
};
var saveBtnStyle={
    width: "100px",
marginLeft: "-127px",
marginTop: "12px"
}
var  leftFloat={
    // float: "Left"
}
var questionStyle = {
    marginTop: "20px",
    float: "center",
    display:"inline-block",

    width:"50%"
};

var dialogStyle = {
   /* border: "solid 1px #ccc",
    margin: "10px auto",
    padding: "20px 30px",
    display: "inline-block",
    boxShadow: "0 0 4px #ccc",
    backgroundColor: "#FAF8F8",
    overflow: "hidden",
    position: "relative",
    maxWidth: "450px"*/
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
    width:"70px",
    float:"left"
}
var renderValue=[];
class QuestionForm extends Component {

    
    state=
    {
        "surveyId":0,
        "userId":0,
        "questions":[],
        image:""
    }

    handleSubmit() {
        var answers = [];
        if(this.state.questions.length > 0){
        for (var i = 0; i <= this.state.questions.length - 1; i++) {
            // debugger;
            var id = this.state.questions[i].question_id;
            if (this.state.questions[i].question_type == "R") {

                var radioVal = document.getElementsByName(id);

                var radio_value;
                var opt_id;
                if(radioVal)
                for (var j = 0; j < radioVal.length; j++) {
                    if (radioVal[j].checked) {
                        radio_value = radioVal[j].value;
                        opt_id = this.state.questions[i].options[j].option_id;
                    }
                }
                this.state.questions[i].answers = [];
                var obj = {};
                obj["optionId"] = opt_id;
                obj["optionDescription"] = radio_value;
                this.state.questions[i].answers.push(obj);
            }
            // resultData.questions[i].answers[0].optionId=opt_id;
            // resultData.questions[i].answers[0].option_description=radio_value;
            // for(var temp=1;temp<resultData.questions[i].answers.length;temp++)
            // delete resultData.questions[i].answers[temp]

            if (this.state.questions[i].question_type == "CB") {
                debugger;
                var checkVal = document.getElementsByName(id);
                var checkedBoxes = "";
                var checkedArray = []
                var checkedIdArray = []
                if(checkVal)
                for (var k = 0; k < checkVal.length; k++) {

                    if (checkVal[k].checked) {
                        checkedBoxes = checkedBoxes + checkVal[k].value;
                        checkedBoxes = checkedBoxes + ',';
                        checkedArray.push(checkVal[k].value);
                        checkedIdArray.push(this.state.questions[i].options[k].option_id)
                    }
                }
                this.state.questions[i].answers = []
                if(checkedArray)
                for (var k = 0; k < checkedArray.length; k++) {
                    var obj = {};
                    obj["optionId"] = checkedIdArray[k];
                    obj["optionDescription"] = checkedArray[k]
                    this.state.questions[i].answers.push(obj);
                }
            }
            if (this.state.questions[i].question_type == "DT") {
                this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)

            }
            if (this.state.questions[i].question_type == "TB") {
                debugger;
                if(this.state.questions[i].options.length>0)
                {
                    debugger;
                    var obj = {};
                    obj["optionId"] = this.state.questions[i].options[0].optionId;
                    obj["optionDescription"] = document.getElementById(id).value
                    this.state.questions[i].answers.push(obj);
                }


                // this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;

                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "DR") {
                if(this.state.questions[i].answers.length>0)
                    this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "I") {
                if(this.state.questions[i].answers.length>0){}
                    //this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "ST") {

                var elements = document.getElementsByName(id);
                if(elements)
                for(var temp_star=0;temp_star<elements.length;temp_star++)
                {
                    if(elements[temp_star].checked){
                        if(this.state.questions[i].options.length>0) {
                            var obj = {};
                            obj["optionId"] = this.state.questions[i].options[0].optionId;
                            obj["optionDescription"] =elements[temp_star].value;
                            this.state.questions[i].answers.push(obj);
                        }
                        // this.state.questions[i].answers[0].optionDescription = elements[temp_star].value;
                    }
                }

                //resultData.questions[i].answers[0].option_description = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
        }
        }
        debugger
        alert("submit executed");

        // Payload for saveanswers



        


        if (localStorage.getItem("email") == null) {
            var personEmail = prompt("Please enter your email");
            localStorage.setItem("email",personEmail)
        }
        var emailVal=localStorage.getItem("email");
        let surveyId = this.props.match.params.surveyId;
        let uuid = this.props.match.params.uuid;
        let email=emailVal;
        let tempState=this.state;
        debugger;
        API.submitAnswers({tempState,email}).then
        ((output) => {
            debugger;
            console.log(output)
        
        }) ;


    }


handleSave() {
        var answers = [];
        if(this.state.questions.length > 0){
        for (var i = 0; i <= this.state.questions.length - 1; i++) {
            // debugger;
            var id = this.state.questions[i].question_id;
            if (this.state.questions[i].question_type == "R") {

                var radioVal = document.getElementsByName(id);

                var radio_value;
                var opt_id;
                for (var j = 0; j < radioVal.length; j++) {
                    if (radioVal[j].checked) {
                        radio_value = radioVal[j].value;
                        opt_id = this.state.questions[i].options[j].option_id;
                    }
                }
                this.state.questions[i].answers = [];
                var obj = {};
                obj["optionId"] = opt_id;
                obj["optionDescription"] = radio_value;
                this.state.questions[i].answers.push(obj);
            }
            // resultData.questions[i].answers[0].optionId=opt_id;
            // resultData.questions[i].answers[0].option_description=radio_value;
            // for(var temp=1;temp<resultData.questions[i].answers.length;temp++)
            // delete resultData.questions[i].answers[temp]

            if (this.state.questions[i].question_type == "CB") {
                debugger;
                var checkVal = document.getElementsByName(id);
                var checkedBoxes = "";
                var checkedArray = []
                var checkedIdArray = []
                for (var k = 0; k < checkVal.length; k++) {

                    if (checkVal[k].checked) {
                        checkedBoxes = checkedBoxes + checkVal[k].value;
                        checkedBoxes = checkedBoxes + ',';
                        checkedArray.push(checkVal[k].value);
                        checkedIdArray.push(this.state.questions[i].options[k].option_id)
                    }
                }
                this.state.questions[i].answers = []
                for (var k = 0; k < checkedArray.length; k++) {
                    var obj = {};
                    obj["optionId"] = checkedIdArray[k];
                    obj["optionDescription"] = checkedArray[k]
                    this.state.questions[i].answers.push(obj);
                }
            }
            if (this.state.questions[i].question_type == "DT") {
                this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)

            }
            if (this.state.questions[i].question_type == "TB") {
                debugger;
                if(this.state.questions[i].options.length>0)
                {
                     debugger;
                     var obj = {};
                    obj["optionId"] = this.state.questions[i].options[0].option_id;
                    obj["optionDescription"] = document.getElementById(id).value
                    if(this.state.questions[i].answers.length >0){
                        this.state.questions[i].answers=[];
                        this.state.questions[i].answers.push(obj);
                    }
                    else{
                        this.state.questions[i].answers.push(obj);
                    }
                }


               // this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;

                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "DR") {
                if(this.state.questions[i].answers.length>0)
                this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "ST") {

                var elements = document.getElementsByName(id);
                for(var temp_star=0;temp_star<elements.length;temp_star++)
                {
                    if(elements[temp_star].checked){
                        if(this.state.questions[i].options.length>0) {
                            var obj = {};
                            obj["optionId"] = this.state.questions[i].options[0].option_id;
                            obj["optionDescription"] =elements[temp_star].value;
                            if(this.state.questions[i].answers.length >0){
                                this.state.questions[i].answers=[];
                                this.state.questions[i].answers.push(obj);
                            }
                            else{
                                this.state.questions[i].answers.push(obj);
                            }
                        }
                       // this.state.questions[i].answers[0].optionDescription = elements[temp_star].value;
                    }
                }

                //resultData.questions[i].answers[0].option_description = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
        }
        }
        debugger
        alert("save executed");

        // Payload for saveanswers
        let surveyId = this.props.match.params.surveyId;
        let uuid = this.props.match.params.uuid;

        debugger;

        API.saveanswers(this.state).then
                ((output) => {
                    console.log(output)
                  
                    }) ;


    }
    componentWillMount() {
        let surveyId = this.props.match.params.surveyId;
        let uuid = this.props.match.params.uuid;

        //var surveyId=this.props.survey_id;
        //  var str = "localhost:3000/survey/1";
        //var res = str.split("/")[2];
        debugger;
        var self = this;
        var payload ={
            surveyId : this.props.match.params.surveyId,
            uuid :this.props.match.params.uuid
}
                API.rendersurveys(payload).then
                ((output) => {
                    console.log(output)
                   debugger;
                   console.log(this)
                    var questions = output.questions;
                    questions.map((q)=>{
                        var ans = q.answers;
                        var new_ans = [];
                        ans.map((a)=>{
                            if(a.emailId == localStorage.getItem("email"))
                            new_ans.push(a);
                        });
                        q.answers = new_ans;
                    });
                    
                    this.setState({
                            "surveyId": output.surveyId,
                            "userId": output.userId,
                            "questions": output.questions,
                            "uuid":uuid
                       });
                    }) ;
        debugger;
}

componentDidMount(){
        var self = this;
    setTimeout(function(){ let tempQuestions=self.state.questions;
        //alert("check"+self.state.questions.length);
        for(let i=0;i<self.state.questions.length;i++){
            if(self.state.questions[i].question_type==="I"){
                alert("checkoption"+self.state.questions[i].options.length);
                for(let j=0;j<self.state.questions[i].options.length;j++){
                    API.getfile().then(res => {
                        //alert("data:image/jpeg;base64,"+i+","+j);
                        tempQuestions[i].options[j].option_description= "data:image/jpeg;base64,"+res.data;
                    });
                }
            }
        }
        console.log("tempquestioms",tempQuestions);
        self.setState({"questions":tempQuestions},()=>console.log(self.state)); }, 1000);

}
  

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
                url: 'http://localhost:8080/verificationCheck',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
                .then(function (response) {
                    //handle success
                    if(response.status==200)
                        this.props.history.push("/successfullyVerified");
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

    componentDidUpdate(){
        if(this.state.questions.length > 0){
        for (var i = 0; i <= this.state.questions.length - 1; i++) {

            var id = this.state.questions[i].question_id;
            if (this.state.questions[i].question_type == "R" && this.state.questions[i].answers.length>0) {

                var radioVal = document.getElementsByName(id);
                if(radioVal)
                for (var j = 0; j < radioVal.length; j++) {
                    if(radioVal[j].value==this.state.questions[i].answers[0].answerDescription) {
                        radioVal[j].checked=true;
                    }
                }
            }




            if (this.state.questions[i].question_type == "CB") {
                debugger;
                var id12=this.state.questions[i].question_id;
                var checkVal = document.getElementsByName(id12);
                var checkedBoxes = "";
                var checkedArray = []
                var checkedIdArray = []
                for (var k = 0; k < checkVal.length; k++) {
                    for (var m = 0; m < this.state.questions[i].answers.length; m++) {
                    if(this.state.questions[i].answers[m].answerDescription==checkVal[k].value)
                    {
                        checkVal[k].checked=true;
                    }
                    }

                }
                // resultData.questions[i].answers = []
                // for (var k = 0; k < checkedArray.length; k++) {
                //     var obj = {};
                //     obj["option_id"] = checkedIdArray[k];
                //     obj["option_description"] = checkedArray[k]
                //     resultData.questions[i].answers.push(obj);
                // }
            }
            if (this.state.questions[i].question_type == "DT") {
                if(this.state.questions[i].answers.length>0)
                 document.getElementById(id).value = this.state.questions[i].answers[0].answerDescription;
                //alert(document.getElementById(id).value)

            }
            if (this.state.questions[i].question_type == "TB") {
                if(this.state.questions[i].answers.length>0)
                 document.getElementById(id).value=this.state.questions[i].answers[0].answerDescription;
                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "DR") {
                document.getElementById(id).value=this.state.questions[i].answers[0].answerDescription;
                //alert(document.getElementById(id).value)
            }
            if (this.state.questions[i].question_type == "ST") {
                var id = this.state.questions[i].question_id;
                var elements=document.getElementsByName(id);
                if(this.state.questions[i].answers.length>0)
                elements[parseInt(this.state.questions[i].answers[0].answerDescription)-1].checked=true;
                //alert(document.getElementById(id).value)
            }
        }
        }
    }

    render() {


        var arr=[];
        API.getfile().then(res => {
            //alert("data:image/jpeg;base64,"+i+","+j);
            arr.push("data:image/jpeg;base64,"+res.data);


            if(this.state.questions){
                for(var i=0;i<=this.state.questions.length-1;i++)
                {
                    if (this.state.questions[i].question_type=="R")
                    {

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>)
                        for(var j=0;j<=this.state.questions[i].options.length-1;j++)
                        {
                            renderValue.push(<div className="optionsClass"><input className="form-check-input" id={this.state.questions[i].question_id} onChange={ () =>{this.handleSave()}} style={leftFloat} type="radio" name={this.state.questions[i].question_id} value={this.state.questions[i].options[j].option_description}/>{this.state.questions[i].options[j].option_description}<br/></div>)

                        }
                    }
                    if (this.state.questions[i].question_type=="CB")
                    {

                        renderValue.push(<h5 className="form-control questions" style={leftFloat} >{this.state.questions[i].question_text}</h5>)
                        for(var j=0;j<=this.state.questions[i].options.length-1;j++)
                        {
                            renderValue.push(<div className="optionsClass"><input className="form-check-input"  style={leftFloat}  onChange={ () =>{this.handleSave()}} id={this.state.questions[i].question_id} type="checkbox"  name={this.state.questions[i].question_id} value={this.state.questions[i].options[j].option_description}/>{this.state.questions[i].options[j].option_description}<br/></div>)

                        }
                    }
                    if (this.state.questions[i].question_type=="DT")
                    {

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>)

                        renderValue.push(<div className="optionsClass"><input type="date" className="form-check-input inputStyle"  style={leftFloat}  onChange={ () =>{this.handleSave()}} id={this.state.questions[i].question_id} name="gender"/><br/></div>)

                    }
                    if (this.state.questions[i].question_type=="TB")
                    {

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>)

                        renderValue.push(<div className="optionsClass"><input type="text" className="form-check-input inputStyle"  style={leftFloat} onChange={ () =>{this.handleSave()}} id={this.state.questions[i].question_id} name="gender"/><br/></div>)

                    }
                    if (this.state.questions[i].question_type==="I")
                    {
                        let temp="";

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>);
                        for(let j=0;j<=this.state.questions[i].options.length-1;j++)
                        {

                            //renderValue.push(<div className="optionsClass"><img src={"data:image/jpeg;base64,"+"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"} alt={"option"+(i+1)}/>{this.state.questions[i].options[j].option_description}<br/></div>)
                             renderValue.push(<div className="optionsClass"><img src={arr[0]} alt={"option"+(i+1)}/>{this.state.questions[i].options[j].option_description}<br/></div>)

                        }

                    }
                    if (this.state.questions[i].question_type=="DR")
                    {

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>)
                        var dropdownVal=[]

                        for(var j=0;j<=this.state.questions[i].options.length-1;j++)
                        {
                            dropdownVal.push(<option>{this.state.questions[i].options[j].option_description}</option>)
                        }
                        renderValue.push(<select className="form-control optionsClass inputStyle" onChange={ () =>{this.handleSave()}} id={this.state.questions[i].question_id}>{dropdownVal}</select>);

<<<<<<< Updated upstream
        if(this.state.questions.length > 0){
        for (var i = 0; i <= this.state.questions.length - 1; i++) {
=======
>>>>>>> Stashed changes

                    }

                    if (this.state.questions[i].question_type=="ST")
                    {

                        renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{this.state.questions[i].question_text}</h5>)
                        var starComp=[]
                        var tempVar;
                        for(var j=1;j<=5;j++)
                        {
                            tempVar="star-"+j;
                            starComp.push(<input type="radio" name={this.state.questions[i].question_id} className={tempVar} id={tempVar}  value={j} onChange={ () =>{this.handleSave()}}/>)

                            starComp.push(  <label className={tempVar} htmlFor={tempVar}>{j}</label>)
                        }
                        renderValue.push(<div className="stars">{starComp}<span></span></div>);

                    }
                }
            }

            if(this.state.questions){
                for (var i = 0; i <= this.state.questions.length - 1; i++) {

                    var id = this.state.questions[i].question_id;
                    if (this.state.questions[i].question_type == "R" && this.state.questions[i].answers.length>0) {

                        var radioVal = document.getElementsByName(toString(id));
                        for (var j = 0; j < radioVal.length; j++) {
                            if(radioVal[j].value==this.state.questions[i].answers[0].optionDescription) {
                                radioVal[j].checked=true;
                            }
                        }
                    }




                    if (this.state.questions[i].question_type == "CB") {
                        debugger;
                        var id12=this.state.questions[i].question_id;
                        var checkVal = document.getElementsByName(toString(id12));
                        var checkedBoxes = "";
                        var checkedArray = []
                        var checkedIdArray = []
                        for (var k = 0; k < checkVal.length; k++) {
                            for (var m = 0; m < this.state.questions[i].answers.length; m++) {
                                if(this.state.questions[i].answers[m].optionDescription==checkVal[k].value)
                                {
                                    checkVal[k].checked=true;
                                }
                            }

                        }
                        // resultData.questions[i].answers = []
                        // for (var k = 0; k < checkedArray.length; k++) {
                        //     var obj = {};
                        //     obj["option_id"] = checkedIdArray[k];
                        //     obj["option_description"] = checkedArray[k]
                        //     resultData.questions[i].answers.push(obj);
                        // }
                    }
                    if (this.state.questions[i].question_type == "DT") {
                        if(this.state.questions[i].answers.length>0)
                            document.getElementById(toString(id)).value = this.state.questions[i].answers[0].optionDescription;
                        //alert(document.getElementById(id).value)

                    }
                    if (this.state.questions[i].question_type == "TB") {
                        if(this.state.questions[i].answers.length>0)
                            document.getElementById(toString(id)).value=this.state.questions[i].answers[0].optionDescription;

                        //alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "DR") {
                        document.getElementById(toString(id)).value=this.state.questions[i].answers[0].optionDescription;
                        //alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "ST") {
                        var id = this.state.questions[i].question_id;
                        var elements=document.getElementsByName(toString(id));
                        if(this.state.questions[i].answers.length>0)
                            elements[parseInt(this.state.questions[i].answers[0].optionDescription)-1].checked=true;
                        //alert(document.getElementById(id).value)
                    }
                }
            }
        });

        
        return (
            <div >


                <Route exact path="/survey/:surveyId/:uuid" render={() => (
                    <div id="wrapper">
                        <div id="dialog" style={questionStyle}>

                            <div>
                                <h3>
                                    SurveyApe-Fill out your survey here

                                </h3>
                                {renderValue}

                                <div className="col-md-offset-3 col-md-9" >
                                    <button id="btn-signup" style={saveBtnStyle} onClick={ () =>{this.handleSubmit()}} type="button" className="btn btn-success">  Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(QuestionForm);