export const SAVED_SURVEYS='SAVED_SURVEYS';
export const SELECTED_SAVED_SURVEYS='SELECTED_SAVED_SURVEYS';
export const OPEN_UNIQUE_EMAIL_ID='OPEN_UNIQUE_EMAIL_ID';
export const OPEN_UNIQUE_SURVEYS='OPEN_UNIQUE_SURVEYS';
export const GENERAL_SURVEYS='GENERAL_SURVEYS';
export const GIVEN_SURVEYS='GIVEN_SURVEYS';


export function allsavedsurveys(data) {
    return {
        type: 'SAVED_SURVEYS',
        data,
    };
}


export function selectedsurvey(data) {
    return {
        type: 'SELECTED_SAVED_SURVEYS',
        data,
    };
}

export function openuniqueemailid(data) {
    return {
        type: 'OPEN_UNIQUE_EMAIL_ID',
        data,
    };
}

export function allopenuniquesurveys(data) {
    return {
        type: 'OPEN_UNIQUE_SURVEYS',
        data,
    };
}

export function allgeneralsurveys(data) {
    return {
        type: 'GENERAL_SURVEYS',
        data,
    };
}

export function allgivensurveys(data) {
    return {
        type: 'GIVEN_SURVEYS',
        data,
    };
}
