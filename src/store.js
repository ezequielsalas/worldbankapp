import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer, {initialState} from './rootReducer';



const configureStore = (middlewares) => {
    return createStore(rootReducer,
        initialState,
        compose(applyMiddleware(...middlewares,thunk)));
};

const getStore = () => {

        return configureStore([
            thunkWithPromiseErrorHandler
        ]);

};

const thunkWithPromiseErrorHandler = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
            .catch(err => {
               console.log("Dispatching error"+ err);
                return Promise.reject('ignore');
            });
    } else {
        return next(action);
    }
};

export default getStore;