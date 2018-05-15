import {GIVEN_SURVEYS} from '../action/getallsavedsurveys';

const initialstate =[]

const getallopengivensurveys =(state=initialstate,action)=>
{
    switch (action.type) {
        case GIVEN_SURVEYS :
            state = action.data;
            return state;
        default :
            return state;
    }
}

export default getallopengivensurveys;