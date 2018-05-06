import {SELECTED_SAVED_SURVEYS} from '../action/getallsavedsurveys';

const initialstate ={}

const getallsavedsurveys =(state=initialstate,action)=>
{
    switch (action.type) {
        case SELECTED_SAVED_SURVEYS :
            state = action.data;
            return state;
        default :
            return state;
    }
}

export default getallsavedsurveys;