import * as types from './actionTypes';
import request, {PATCH} from '../common/helpers'

export const getCountryData = () => {
    return dispatch =>
        request("display_data").then(response  =>{
            dispatch({
                type: types.SET_COUNTRY_DATA,
                countryData: response.data
            })
            }
        )
};
export const loadDropDown = () => {
    return dispatch =>
        request("load_dropdown").then(response  =>{
            debugger;
                dispatch({
                    type: types.SET_DROPDOWN_DATA,
                    dropdownData: response
                })
            }
        )
};

export const setCountryData = (data) => {
        return {
                type: types.SET_COUNTRY_DATA,
                countryData: data
            }
};


export const updateCountryData = (countryDataId, data) =>{
    return dispatch =>
        request(`display_data/${countryDataId}`, data, PATCH, true);
};
