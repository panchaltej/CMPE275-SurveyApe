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
        "isLinkUsed":0
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
        tempState["email"]=email;
        //alert(email);
       // debugger;
        API.submitAnswers({tempState}).then
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
                //if(this.state.questions[i].answers.length>0)
                //this.state.questions[i].answers[0].optionDescription = document.getElementById(id).value;
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
        // alert("save executed");

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
                   if(output){
                    var questions = output.questions;
                    if(questions && questions.length > 0){
                    questions.map((q)=>{
                        var ans = q.answers;
                        var new_ans = [];
                        ans.map((a)=>{
                            if(a.emailId == output.emailId)
                            new_ans.push(a);
                        });
                        q.answers = new_ans;
                    });
                    
                    this.setState({
                            "surveyId": output.surveyId,
                            "userId": output.userId,
                            "questions": output.questions,
                            "uuid":uuid,
                            "isLinkUsed":output.isLinkUsed
                       }, console.log("State:"+this.state.surveyId));
                    }
                    else{
                        alert("Survey is closed or not published yet!")
                    }
                }
                else{
                    alert("Survey is closed or not published yet!")
                }
                    }) ;
        debugger;
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
        if(this.state.questions!=undefined) {
            if (this.state.questions.length > 0) {
                for (var i = 0; i <= this.state.questions.length - 1; i++) {

                    var id = this.state.questions[i].question_id;
                    if (this.state.questions[i].question_type == "R" && this.state.questions[i].answers.length > 0) {

                        var radioVal = document.getElementsByName(id);
                        if (radioVal)
                            for (var j = 0; j < radioVal.length; j++) {
                                if (radioVal[j].value == this.state.questions[i].answers[0].answerDescription) {
                                    radioVal[j].checked = true;
                                }
                            }
                    }


                    if (this.state.questions[i].question_type == "CB") {
                        debugger;
                        var id12 = this.state.questions[i].question_id;
                        var checkVal = document.getElementsByName(id12);
                        var checkedBoxes = "";
                        var checkedArray = []
                        var checkedIdArray = []
                        for (var k = 0; k < checkVal.length; k++) {
                            for (var m = 0; m < this.state.questions[i].answers.length; m++) {
                                if (this.state.questions[i].answers[m].answerDescription == checkVal[k].value) {
                                    checkVal[k].checked = true;
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
                        if (this.state.questions[i].answers.length > 0)
                            document.getElementById(id).value = this.state.questions[i].answers[0].answerDescription;
                        //alert(document.getElementById(id).value)

                    }
                    if (this.state.questions[i].question_type == "TB") {
                        if (this.state.questions[i].answers.length > 0) {
                            document.getElementById(id).value = this.state.questions[i].answers[0].answerDescription;
                            debugger;
                            // if(this.state.questions[i].question_text.includes("email"))
                            // {
                            //     alert("contains email")
                            //     if(document.getElementById(toString(id)).value=="")
                            //     {
                            //         document.getElementById(toString(id)).value=localStorage.getItem("email")
                            //     }
                            // }
                        }//alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "DR") {
                        if (this.state.questions[i].answers.length > 0) {
                            debugger;
                            document.getElementById(id).value = this.state.questions[i].answers[0].answerDescription;
                        }
                        //alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "ST") {
                        var id = this.state.questions[i].question_id;
                        var elements = document.getElementsByName(id);
                        if (this.state.questions[i].answers.length > 0)
                            elements[parseInt(this.state.questions[i].answers[0].answerDescription) - 1].checked = true;
                        //alert(document.getElementById(id).value)
                    }

                    // if (this.state.questions[i].question_type == "TB") {
                    //     if (this.state.questions[i].question_text.includes("email")) {
                    //         alert(localStorage.getItem("email"))
                    //         if (document.getElementById(toString(id)) != undefined) {
                    //             alert("The Doc val is :"+ document.getElementById(toString(id)).value)
                    //             if (document.getElementById(toString(id)).value == "") {
                    //                 document.getElementById(toString(id)).value = localStorage.getItem("email")
                    //             }
                    //         }
                    //     }
                    // }
                }
            }
        }
    }

    componentDidMount(){ //added only for fetching images
        setTimeout(()=>{
            let list= document.getElementsByClassName("Images");
            for (let i = 0; i < list.length; i++) {

                (function(e) {
                    let payload={"imageName":list[e].alt};
                API.getImages(payload).then((response)=>{
                    list[e].src="data:image/png;base64,"+response.data;
                    })
                })(i);
            }
        },100)

    }

    renderButton(){
        if(this.state.isLinkUsed == 0 || this.state.isLinkUsed == undefined)
        return(
            <button id="btn-signup" style={saveBtnStyle} onClick={ () =>{this.handleSubmit()}} type="button" className="btn btn-success">  Submit</button>)
        else
        alert("You had already submitted the survey")
        //window.location.reload();
        return(

            <button id="btn-signup" style={saveBtnStyle} onClick={ () =>{this.handleSubmit()}} disabled type="button" className="btn btn-success">  Submit</button>)
    }

    render() {
        if(this.state.questions!=undefined) {
            if (this.state.questions.length > 0) {
               // renderValue.push(<h5>Your Email Id is:{localStorage.getItem("email")}</h5>)
               //  renderValue.push(<h5 className="form-control questions"
               //                       style={leftFloat}>Enter your Email Id:</h5>)
               //
               //  renderValue.push(<div className="optionsClass"><input type="text"
               //                                                        className="form-check-input inputStyle"
               //                                                        style={leftFloat} value={localStorage.getItem("email")}/><br/></div>)

                for (var i = 0; i <= this.state.questions.length - 1; i++) {
                    if (this.state.questions[i].question_type == "R") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)
                        for (var j = 0; j <= this.state.questions[i].options.length - 1; j++) {
                            renderValue.push(<div className="optionsClass"><input className="form-check-input"
                                                                                  id={this.state.questions[i].question_id}
                                                                                  onChange={() => {
                                                                                      this.handleSave()
                                                                                  }} style={leftFloat} type="radio"
                                                                                  name={this.state.questions[i].question_id}
                                                                                  value={this.state.questions[i].options[j].option_description}/>{this.state.questions[i].options[j].option_description}<br/>
                            </div>)

                        }
                    }
                    if (this.state.questions[i].question_type == "CB") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)
                        for (var j = 0; j <= this.state.questions[i].options.length - 1; j++) {
                            renderValue.push(<div className="optionsClass"><input className="form-check-input"
                                                                                  style={leftFloat} onChange={() => {
                                this.handleSave()
                            }} id={this.state.questions[i].question_id} type="checkbox"
                                                                                  name={this.state.questions[i].question_id}
                                                                                  value={this.state.questions[i].options[j].option_description}/>{this.state.questions[i].options[j].option_description}<br/>
                            </div>)

                        }
                    }
                    if (this.state.questions[i].question_type == "DT") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)

                        renderValue.push(<div className="optionsClass"><input type="date"
                                                                              className="form-check-input inputStyle"
                                                                              style={leftFloat} onChange={() => {
                            this.handleSave()
                        }} id={this.state.questions[i].question_id} name="gender"/><br/></div>)

                    }
                    if (this.state.questions[i].question_type == "TB") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)

                        renderValue.push(<div className="optionsClass"><input type="text"
                                                                              className="form-check-input inputStyle"
                                                                              style={leftFloat} onChange={() => {
                            this.handleSave()
                        }} id={this.state.questions[i].question_id} name="gender"/><br/></div>)

                    }
                    if (this.state.questions[i].question_type === "I") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>);
                        for (let j = 0; j <= this.state.questions[i].options.length - 1; j++) {
                                renderValue.push(<div className="optionsClass"><img src={""} className="Images"
                                                                                    alt={this.state.questions[i].options[j].option_description}/><br/>
                                </div>);
                        }


                    }
                    if (this.state.questions[i].question_type == "DR") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)
                        var dropdownVal = []

                        for (var j = 0; j <= this.state.questions[i].options.length - 1; j++) {
                            dropdownVal.push(<option>{this.state.questions[i].options[j].option_description}</option>)
                        }
                        renderValue.push(<select className="form-control optionsClass inputStyle" onChange={() => {
                            this.handleSave()
                        }} id={this.state.questions[i].question_id}>{dropdownVal}</select>);


                    }

                    if (this.state.questions[i].question_type == "ST") {

                        renderValue.push(<h5 className="form-control questions"
                                             style={leftFloat}>{this.state.questions[i].question_text}</h5>)
                        var starComp = []
                        var tempVar;
                        for (var j = 1; j <= 5; j++) {
                            tempVar = "star-" + j;
                            starComp.push(<input type="radio" name={this.state.questions[i].question_id}
                                                 className={tempVar} id={tempVar} value={j} onChange={() => {
                                this.handleSave()
                            }}/>)

                            starComp.push(<label className={tempVar} htmlFor={tempVar}>{j}</label>)
                        }
                        renderValue.push(<div className="stars">{starComp}<span></span></div>);

                    }
                }
            }
        }
        if(this.state.questions!=undefined) {
            if (this.state.questions.length > 0) {
                for (var i = 0; i <= this.state.questions.length - 1; i++) {

                    var id = this.state.questions[i].question_id;
                    if (this.state.questions[i].question_type == "R" && this.state.questions[i].answers.length > 0) {

                        var radioVal = document.getElementsByName(toString(id));
                        for (var j = 0; j < radioVal.length; j++) {
                            if (radioVal[j].value == this.state.questions[i].answers[0].optionDescription) {
                                radioVal[j].checked = true;
                            }
                        }
                    }


                    if (this.state.questions[i].question_type == "CB") {
                        debugger;
                        var id12 = this.state.questions[i].question_id;
                        var checkVal = document.getElementsByName(toString(id12));
                        var checkedBoxes = "";
                        var checkedArray = []
                        var checkedIdArray = []
                        for (var k = 0; k < checkVal.length; k++) {
                            for (var m = 0; m < this.state.questions[i].answers.length; m++) {
                                if (this.state.questions[i].answers[m].optionDescription == checkVal[k].value) {
                                    checkVal[k].checked = true;
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
                        if (this.state.questions[i].answers.length > 0)
                            document.getElementById(toString(id)).value = this.state.questions[i].answers[0].optionDescription;
                        //alert(document.getElementById(id).value)

                    }
                    if (this.state.questions[i].question_type == "TB") {
                        if (this.state.questions[i].answers.length > 0) {
                            if (document.getElementById(toString(id)) != undefined)
                                document.getElementById(toString(id)).value = this.state.questions[i].answers[0].optionDescription;
                            debugger;
                            // if(this.state.questions[i].question_text.includes("email"))
                            // {
                            //     if(document.getElementById(toString(id)).value=="")
                            //     {
                            //         document.getElementById(toString(id)).value=localStorage.getItem("email")
                            //     }
                            // }

                        }

                        //alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "DR") {
                        if (this.state.questions[i].answers.length > 0) {
                            if (document.getElementById(toString(id)) != undefined) {
                                debugger;
                                document.getElementById(toString(id)).value = this.state.questions[i].answers[0].answerDescription;
                            }
                        }
                        //alert(document.getElementById(id).value)
                    }
                    if (this.state.questions[i].question_type == "ST") {
                        var id = this.state.questions[i].question_id;
                        var elements = document.getElementsByName(toString(id));
                        if (this.state.questions[i].answers.length > 0) {
                            if (elements[parseInt(this.state.questions[i].answers[0].optionDescription) - 1] != undefined)
                                elements[parseInt(this.state.questions[i].answers[0].optionDescription) - 1].checked = true;
                        }
                        //alert(document.getElementById(id).value)
                    }

                    // if (this.state.questions[i].question_type == "TB") {
                    //     if (this.state.questions[i].question_text.includes("email")) {
                    //         alert(localStorage.getItem("email"))
                    //         if (document.getElementById(toString(id)) != undefined) {
                    //             alert("The Doc val is :"+ document.getElementById(toString(id)).value)
                    //             if (document.getElementById(toString(id)).value == "") {
                    //                 document.getElementById(toString(id)).value = localStorage.getItem("email")
                    //             }
                    //         }
                    //     }
                    // }
                }
            }
        }
        
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
                                    {this.renderButton()}
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