import {OPEN_UNIQUE_EMAIL_ID} from '../action/getallsavedsurveys';

const initialstate ={}

const openuniqueemail =(state=initialstate,action)=>
{
    switch (action.type) {
        case OPEN_UNIQUE_EMAIL_ID:
            state = action.data;
            console.log("state:"+state)
            return state;
        default :
            return state;
    }
}

export default openuniqueemail;