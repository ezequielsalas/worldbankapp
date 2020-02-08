import * as types from './actionTypes';
export const initialState = {
    countryData: {

    },
};


export const countryDataReducer = (state = initialState.countryData, action) => {
    switch (action.type) {
        case types.SET_COUNTRY_DATA:
            return {
                ...state,
                countryData: action.countryData,
            };


        default:
            return state;
    }
};
