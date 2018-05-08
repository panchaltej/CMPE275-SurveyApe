import axios from 'axios';
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';


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

// export const uploadFile = (payload) =>
//     fetch(`${api}/survey/addsurveyees`, {
//         method: 'POST',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload),
//         credentials:'include'
//     }).then(res => res.status)
//
//         .then(res=>{
//             console.log(res);
//             return res;
//         })
//         .catch(error => {
//             console.log("This is error");
//             return error;
//         });
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