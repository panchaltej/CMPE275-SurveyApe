import {combineReducers} from 'redux';

import Getallsavedsurveys from './getallsavedsurveys'
import Selectedsavedsurveys from './selectedsavedsurvey'
import Openuniqueemailid from './openuniqueemail'



const allReducers = combineReducers({
    //insert reducer name here to combine
    getallsavedsurveys : Getallsavedsurveys,
    selectedsavedsurveys: Selectedsavedsurveys,
    openuniqueemailid: Openuniqueemailid
});

export default allReducers;