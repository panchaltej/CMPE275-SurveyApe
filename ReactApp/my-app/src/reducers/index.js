import {combineReducers} from 'redux';

import Getallsavedsurveys from './getallsavedsurveys'
import Selectedsavedsurveys from './selectedsavedsurvey'
import Openuniqueemailid from './openuniqueemail'
import Getallopenuniquesurveys from './allopenuniquesurveys'




const allReducers = combineReducers({
    //insert reducer name here to combine
    getallsavedsurveys : Getallsavedsurveys,
    selectedsavedsurveys: Selectedsavedsurveys,
    openuniqueemailid: Openuniqueemailid,
    getallopenuniquesurveys:Getallopenuniquesurveys
});

export default allReducers;