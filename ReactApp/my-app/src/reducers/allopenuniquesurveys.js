import {OPEN_UNIQUE_SURVEYS} from '../action/getallsavedsurveys';

const initialstate =[]

const getallopenuniquesurveys =(state=initialstate,action)=>
{
    switch (action.type) {
        case OPEN_UNIQUE_SURVEYS :
            state = action.data;
            return state;
        default :
            return state;
    }
}

export default getallopenuniquesurveys;