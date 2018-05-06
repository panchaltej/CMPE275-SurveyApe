const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

//insertHotelData
export const getFlights = (payload) =>
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