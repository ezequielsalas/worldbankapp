
import economy from './modules/countrydata';
import { combineReducers } from 'redux';

export const initialState = {
    ...economy.reducers.initialState,
};

const appReducer = combineReducers({
    countryData: economy.reducers.countryDataReducer,
});

export default (state, action) => {
    if(action.type === 'RESET_STATE')
        state = undefined;
    return appReducer(state, action)
}