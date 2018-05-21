
import axios from "axios"
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://surveyape.us-west-1.elasticbeanstalk.com'



const headers = {
    'Accept': 'application/json'
};

export const createSurvey = (payload) =>
    fetch(`${api}/survey`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())

        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//insertHotelData
export const getSavedSurveys = (payload) =>
    fetch(`${api}/survey/allsavedsurveys?user_id=`+localStorage.getItem("email"), {
        method: 'GET',
        headers: {
            ...headers,
           // 'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.json())

        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const addInvitees = (payload) =>
    fetch(`${api}/survey/addsurveyees`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => res.status)

        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const uploadFile = (payload) =>
    axios.post(api + '/survey/uploadImages', payload,{withCredentials:true})
        .then(res => {
            console.log('response from server fileupload', res.data);

            return res;
        })
        .catch(error => {
            console.log("This is error in fileupload API",error);
            return error;
        });


        export const getOpenUniqueSurvey = (payload) =>
                fetch(`${api}/survey/allopenuniquesurveys`, {
                    method: 'GET',
                    headers: {
                        ...headers,
                       // 'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    credentials:'include'
                }).then(res => res.json())
            
                    .then(res=>{
                        console.log(res);
                        return res;
                    })
                    .catch(error => {
                        console.log("This is error");
                        return error;
                  });

export const registerEmailForOpenUnique = (payload) =>
            fetch(`${api}/survey/openUniqueSurvey/emailRegister`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials:'include'
            }).then(res => res.body)
        
                .then(res=>{
                    console.log(res);
                    return res;
                })
                .catch(error => {
                    console.log("This is error");
                    return error;
                });
                export const rendersurveys = (payload) =>
                fetch(`${api}/survey/`+payload.surveyId+`/`+payload.uuid, {
                    method: 'GET',
                    headers: {
                        ...headers,
                        //'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify(payload),
                    credentials:'include'
                }).then(res => res.json())
            
                    .then(res=>{
                        //console.log(res);
                        return res;
                    })
                    .catch(error => {
                        console.log("This is error");
                        return error;
                    });
            
export const saveanswers = (payload) =>
                    fetch(`${api}/survey/response/save`, {
                        method: 'POST',
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload),
                        credentials:'include'
                    }).then(res => res.json())
                
                        .then(res=>{
                            //console.log(res);
                            return res;
                        })
                        .catch(error => {
                            console.log("This is error");
                            return error;
                        });

export const emailregister  = (payload) =>
axios.post(api + '/survey/openUniqueSurvey/emailRegister', payload)
                        .then(res => {
                            console.log('response from server deletefile', res);

                            return res;
                        })
                        .catch(error => {
                            console.log("This is error in API",error);
                            return error;
                        });

    export const submitAnswers = (payload) =>
        fetch(`${api}/survey/response/submit`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => res.json())
    
            .then(res=>{
                //console.log(res);
                return res;
            })
            .catch(error => {
                console.log("This is error");
                return error;
            });
export const unpublish  = (payload) =>
                        axios.post(api + '/survey/unpublish', payload)
                            .then(res => {
                                console.log('response from server unpublish', res);
                    
                                return res;
                            })
                            .catch(error => {
                                console.log("This is error in API",error);
                                return error;
                            });



export const getgeneralSurvey = (payload) =>
                            fetch(`${api}/survey/allgeneralsurveys`, {
                                method: 'GET',
                                headers: {
                                    ...headers,
                                   // 'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload),
                                credentials:'include'
                            }).then(res => res.json())
                        
                                .then(res=>{
                                    console.log(res);
                                    return res;
                                })
                                .catch(error => {
                                    console.log("This is error");
                                    return error;
                              });

export const getImages  = (payload) =>
    axios.post(api + '/survey/getfile',payload)
        .then(res => {
            //console.log('response from server getImages', res.data);
            return res;
        })
        .catch(error => {
            console.log("This is error in getImages API",error);
            return error;

        });

        export const updateendtime = (payload) =>
        fetch(`${api}/survey/updateendtime`, {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials:'include'
        }).then(res => res.json())
    
            .then(res=>{
                //console.log(res);
                return res;
            })
            .catch(error => {
                console.log("This is error");
                return error;
            });

export const closesurvey = (payload) =>
            fetch(`${api}/survey/closesurvey`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials:'include'
            }).then(res => res.json())
        
                .then(res=>{
                    //console.log(res);
                    return res;
                })
                .catch(error => {
                    console.log("This is error");
                    return error;
                });

export const allgivensurveys = (payload) =>
                fetch(`${api}/survey/allgivensurveys`, {
                    method: 'POST',
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    credentials:'include'
                }).then(res => res.json())
            
                    .then(res=>{
                        console.log(res);
                        return res;
                    })
                    .catch(error => {
                        console.log("This is error");
                        return error;
                  });

