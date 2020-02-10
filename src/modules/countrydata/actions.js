import * as types from './actionTypes';
import request from '../common/helpers'

export const getCountryData = () => {
    return dispatch =>
        request("display_data").then(response  =>
            dispatch({
                type: types.SET_COUNTRY_DATA,
                countryData: response
            }))
};
