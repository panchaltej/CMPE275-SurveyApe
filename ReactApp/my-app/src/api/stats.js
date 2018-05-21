const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://surveyape.us-west-1.elasticbeanstalk.com'

const headers = {
    'Accept': 'application/json'
};

export const getStats = (payload) =>
    fetch(`${api}/stats/`+payload.surveyId, {
        method: 'GET',
        headers: {
            ...headers,
           'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then(res => res.json())
        .then(res=>{
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });