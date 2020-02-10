import * as types from './actionTypes';

export const initialState = {
    countryData: {
        countryDataList: []
    }
};


export const countryDataReducer = (state = initialState.countryData, action) => {

    switch (action.type) {
        case types.SET_COUNTRY_DATA:

            return {
                ...state,
                countryDataList: [...action.countryData.data]
            };

        default:
            return state;
    }
};
