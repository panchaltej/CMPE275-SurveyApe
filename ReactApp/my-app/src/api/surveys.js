import axios from "axios"
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'


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
    }).then(res => res.status)

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
    fetch(`${api}/survey/allsavedsurveys?user_id=1`, {
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