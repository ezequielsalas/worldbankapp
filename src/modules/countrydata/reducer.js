import * as types from './actionTypes';

export const initialState = {
    countryData: {
        countryDataList: [],
        dropdownData:{
            countries:[],
            indicators:[]
        }
    }
};

export const countryDataReducer = (state = initialState.countryData, action) => {

    switch (action.type) {
        case types.SET_COUNTRY_DATA:
            return {
                ...state,
                countryDataList: [...action.countryData]
            };
        case types.SET_DROPDOWN_DATA:
            return {
                ...state,
                dropdownData:{countries: [...action.dropdownData.countries],indicators: [...action.dropdownData.indicators]
                }
            };

        default:
            return state;
    }
};
