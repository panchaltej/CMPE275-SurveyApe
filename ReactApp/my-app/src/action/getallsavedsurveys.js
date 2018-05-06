export const SAVED_SURVEYS='SAVED_SURVEYS';
export const SELECTED_SAVED_SURVEYS='SELECTED_SAVED_SURVEYS';


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
