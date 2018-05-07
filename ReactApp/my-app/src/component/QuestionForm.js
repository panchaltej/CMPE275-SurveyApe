// https://codepen.io/nirarazi/pen/ZGovQo

import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';

var jsonData=
    {
        "survey_id": 4,
        "user_id": 1,
        "questions": [{
            "question_id": "1",
            "question_type": "R",
            "question_text":"Which is the best team in ipl-4?",
            "options": [{
                "option_id": "1",
                "option_description": "Mumbai Indians"
            },
                {
                    "option_id": "2",
                    "option_description": "CSK"
                }
            ],
            "answers": [
                {
                    "optionId": "1",
                    "optionDescription": "Mumbai Indians"
                }
            ]
        },

            {
                "question_id": "2",
                "question_text":"Who is the best batsman in ipl-4?",
                "question_type": "CB",
                "answers": [{
                    "optionId": "1",
                    "optionDescription": "Dhoni - 45"
                },

                    {
                        "optionId": "3",
                        "optionDescription": "Sachin Tendulkar"
                    },
                    {
                        "optionId": "4",
                        "optionDescription": "Virat"
                    }
                ],
                "options": [{
                    "option_id": "1",
                    "option_description": "Dhoni - 45"
                },
                    {
                        "option_id": "2",
                        "option_description": "Rohit"
                    },
                    {
                        "option_id": "3",
                        "option_description": "Sachin Tendulkar"
                    },
                    {
                        "option_id": "4",
                        "option_description": "Virat"
                    }
                ]
            },

            {
            "question_text":"When is your Birthday?",
             "question_type":"DT",
                "question_id": "3",
                "answers": [{
                    "optionId": "1",
                    "optionDescription": "2014-02-09"
                }],
                "options": [{
                    "option_id": "1",
                    "option_description": "Mumbai Indians"
                }]
         },
         {
             "question_text":"Any Other Comments?",
             "question_type":"TB",
             "question_id": "4",
             "answers": [{
                 "optionId": "1",
                 "optionDescription": "where is Deccan Chargers"
             }],
             "options": [{
                 "option_id": "1",
                 "option_description": "Mumbai Indians"
             }]
         },
            {
                "question_text":"Which Team wins ipl?",
                "question_type":"DR",
                "question_id": "5",
                "answers": [{
                    "optionId": "1",
                    "optionDescription": "RCB"
                }],
                "options": [{
                    "option_id": "1",
                    "option_description": "MI"
                },
                    {
                        "option_id": "2",
                        "option_description": "RCB"
                    },
                    {
                        "option_id": "3",
                        "option_description": "SRH"
                    },
                    {
                        "option_id": "4",
                        "option_description": "CSK"
                    }]
            },
            {
                "question_text":"Rate your overall experience?",
                "question_type":"ST",
                "question_id": "6",
                "answers": [{
                    "optionId": "1",
                    "optionDescription": "2"
                }],
                "options": [{
                    "option_id": "1",
                    "option_description": "2"
                }]
            }

        ]
    }
var resultData=jsonData;


// {	"survey_id":4,
//     "user_id":1,
//     "survey_name":"IPL",
//     "is_published":"true",
//     "survey_type":"C",
//     "closed_invitees":"janhudesai@gmail.com,jay.desai@sjsu.edu,kiratib@sjsu.edu",
//     "questions":[
//     {
//         "question_text":"Which is the best team in ipl-4?",
//         "question_id":1,
//         "question_type":"R",
//         "options":[
//             {
//                 "option_description":"Mumbai Indians",
//                 "option_id":1
//
//             },
//             {
//                 "option_description":"CSK"
//             }
//         ]
//     },
//     {
//         "question_text":"Who is the best player-4?",
//         "question_type":"CB",
//         "options":[
//             {
//                 "option_description":"Dhoni - 45"
//
//             },
//             {
//                 "option_description":"Rohit"
//             },
//             {
//                 "option_description":"Sachin Tendulkar"
//             },
//             {
//                 "option_description":"Virat"
//             }
//         ]
//     },
//         {
//             "question_text":"When is your Birthday?",
//             "question_type":"DT",
//             "options":[
//
//             ]
//         },
//         {
//             "question_text":"Any Other Comments?",
//             "question_type":"TB",
//             "options":[
//
//             ]
//         }
// ]
// }
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

    handleSave() {
        var answers = [];

        for (var i = 0; i <= jsonData.questions.length - 1; i++) {
            // debugger;
            var id = jsonData.questions[i].question_id;
            if (jsonData.questions[i].question_type == "R") {

                var radioVal = document.getElementsByName(id);

                var radio_value;
                var opt_id;
                for (var j = 0; j < radioVal.length; j++) {
                    if (radioVal[j].checked) {
                        radio_value = radioVal[j].value;
                        opt_id = jsonData.questions[i].options[j].option_id;
                    }
                }
                resultData.questions[i].answers = [];
                var obj = {};
                obj["optionId"] = opt_id;
                obj["optionDescription"] = radio_value;
                resultData.questions[i].answers.push(obj);
            }
            // resultData.questions[i].answers[0].optionId=opt_id;
            // resultData.questions[i].answers[0].option_description=radio_value;
            // for(var temp=1;temp<resultData.questions[i].answers.length;temp++)
            // delete resultData.questions[i].answers[temp]

            if (jsonData.questions[i].question_type == "CB") {
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
                        checkedIdArray.push(jsonData.questions[i].options[k].option_id)
                    }
                }
                resultData.questions[i].answers = []
                for (var k = 0; k < checkedArray.length; k++) {
                    var obj = {};
                    obj["optionId"] = checkedIdArray[k];
                    obj["optionDescription"] = checkedArray[k]
                    resultData.questions[i].answers.push(obj);
                }
            }
            if (jsonData.questions[i].question_type == "DT") {
                resultData.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)

            }
            if (jsonData.questions[i].question_type == "TB") {
                resultData.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
            if (jsonData.questions[i].question_type == "DR") {
                resultData.questions[i].answers[0].optionDescription = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
            if (jsonData.questions[i].question_type == "ST") {

                var elements = document.getElementsByName(id);
                for(var temp_star=0;temp_star<elements.length;temp_star++)
                {
                    if(elements[temp_star].checked){
                        resultData.questions[i].answers[0].optionDescription = elements[temp_star].value;
                    }
                }

                //resultData.questions[i].answers[0].option_description = document.getElementById(id).value;
                //alert(document.getElementById(id).value)
            }
        }
        debugger
    }
    componentWillMount() {
        debugger;
        for(var i=0;i<=jsonData.questions.length-1;i++)
        {
            if (jsonData.questions[i].question_type=="R")
            {

                renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{jsonData.questions[i].question_text}</h5>)
                for(var j=0;j<=jsonData.questions[i].options.length-1;j++)
                {
                    renderValue.push(<div className="optionsClass"><input className="form-check-input" id={jsonData.questions[i].question_id}  style={leftFloat} type="radio" name={jsonData.questions[i].question_id} value={jsonData.questions[i].options[j].option_description}/>{jsonData.questions[i].options[j].option_description}<br/></div>)
                }
            }
            if (jsonData.questions[i].question_type=="CB")
            {

                renderValue.push(<h5 className="form-control questions" style={leftFloat} >{jsonData.questions[i].question_text}</h5>)
                for(var j=0;j<=jsonData.questions[i].options.length-1;j++)
                {
                            renderValue.push(<div className="optionsClass"><input className="form-check-input"  style={leftFloat} id={jsonData.questions[i].question_id} type="checkbox"  name={jsonData.questions[i].question_id} value={jsonData.questions[i].options[j].option_description}/>{jsonData.questions[i].options[j].option_description}<br/></div>)
                }
            }
            if (jsonData.questions[i].question_type=="DT")
            {

                renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{jsonData.questions[i].question_text}</h5>)

                renderValue.push(<div className="optionsClass"><input type="date" className="form-check-input inputStyle"  style={leftFloat} id={jsonData.questions[i].question_id} name="gender"/><br/></div>)
            }
            if (jsonData.questions[i].question_type=="TB")
            {

                renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{jsonData.questions[i].question_text}</h5>)

                renderValue.push(<div className="optionsClass"><input type="text" className="form-check-input inputStyle"  style={leftFloat} id={jsonData.questions[i].question_id} name="gender"/><br/></div>)
            }
            if (jsonData.questions[i].question_type=="DR")
            {

                renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{jsonData.questions[i].question_text}</h5>)
                var dropdownVal=[]

                for(var j=0;j<=jsonData.questions[i].options.length-1;j++)
                {
                    dropdownVal.push(<option>{jsonData.questions[i].options[j].option_description}</option>)
                }
                renderValue.push(<select className="form-control optionsClass inputStyle" id={jsonData.questions[i].question_id}>{dropdownVal}</select>);

            }

            if (jsonData.questions[i].question_type=="ST")
            {

                renderValue.push(<h5 className="form-control questions"  style={leftFloat} >{jsonData.questions[i].question_text}</h5>)
                var starComp=[]
                var tempVar;
                for(var j=1;j<=5;j++)
                {
                    tempVar="star-"+j;
                    starComp.push(<input type="radio" name={jsonData.questions[i].question_id} className={tempVar} id={tempVar}  value={j}/>)
                    starComp.push(  <label className={tempVar} htmlFor={tempVar}>{j}</label>)
                }
                renderValue.push(<div className="stars">{starComp}<span></span></div>);

            }
        }
    }
    componentDidMount(){
        for (var i = 0; i <= jsonData.questions.length - 1; i++) {

            var id = jsonData.questions[i].question_id;
            if (jsonData.questions[i].question_type == "R" && jsonData.questions[i].answers.length>0) {

                var radioVal = document.getElementsByName(id);
                for (var j = 0; j < radioVal.length; j++) {
                    if(radioVal[j].value==jsonData.questions[i].answers[0].optionDescription) {
                        radioVal[j].checked=true;
                    }
                }
            }




            if (jsonData.questions[i].question_type == "CB") {
                //debugger;
                var checkVal = document.getElementsByName(id);
                var checkedBoxes = "";
                var checkedArray = []
                var checkedIdArray = []
                for (var k = 0; k < checkVal.length; k++) {
                    for (var m = 0; m < jsonData.questions[i].answers.length; m++) {
                    if(jsonData.questions[i].answers[m].optionDescription==checkVal[k].value)
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
            if (jsonData.questions[i].question_type == "DT") {
                 document.getElementById(id).value = resultData.questions[i].answers[0].optionDescription;
                //alert(document.getElementById(id).value)

            }
            if (jsonData.questions[i].question_type == "TB") {
                 document.getElementById(id).value=resultData.questions[i].answers[0].optionDescription;
                //alert(document.getElementById(id).value)
            }
            if (jsonData.questions[i].question_type == "DR") {
                document.getElementById(id).value=resultData.questions[i].answers[0].optionDescription;
                //alert(document.getElementById(id).value)
            }
            if (jsonData.questions[i].question_type == "ST") {
                var id = jsonData.questions[i].question_id;
                var elements=document.getElementsByName(id);
                elements[parseInt(resultData.questions[i].answers[0].optionDescription)-1].checked=true;
                //alert(document.getElementById(id).value)
            }
        }
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

    render() {
        return (
            <div >


                <Route exact path="/successlogin" render={() => (
                    <div id="wrapper">
                        <div id="dialog" style={questionStyle}>


                            <div>
                                <h3>
                                    SurveyApe-Fill out your survey here

                                </h3>
                                {renderValue}

                                <div className="col-md-offset-3 col-md-9" >
                                    <button id="btn-signup" style={saveBtnStyle} onClick={ () =>{this.handleSave()}} type="button" className="btn btn-success">  Save</button>
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