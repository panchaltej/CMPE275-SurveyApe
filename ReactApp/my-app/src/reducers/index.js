import {combineReducers} from 'redux';

import Getallsavedsurveys from './getallsavedsurveys'
import Selectedsavedsurveys from './selectedsavedsurvey'



const allReducers = combineReducers({
    //insert reducer name here to combine
    getallsavedsurveys : Getallsavedsurveys,
    selectedsavedsurveys:Selectedsavedsurveys
});

export default allReducers;