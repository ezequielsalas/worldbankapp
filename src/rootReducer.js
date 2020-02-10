
import countrydata from './modules/countrydata';
import { combineReducers } from 'redux';

export const initialState = {
    ...countrydata.reducers.initialState,
};

const appReducer = combineReducers({
    countryData: countrydata.reducers.countryDataReducer,
});

export default (state, action) => {
    if(action.type === 'RESET_STATE')
        state = undefined;
    return appReducer(state, action)
}