export const SAVED_SURVEYS='SAVED_SURVEYS';
export const SELECTED_SAVED_SURVEYS='SELECTED_SAVED_SURVEYS';
export const OPEN_UNIQUE_EMAIL_ID='OPEN_UNIQUE_EMAIL_ID';


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
