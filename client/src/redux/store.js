import React from 'react'
import {applyMiddleware, createStore, compose} from 'redux'
import rootReducer from './reducers/'
import {Provider}  from 'react-redux'
import thunk from 'redux-thunk'

//createStore chi co 2 tham so

    
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunk
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider
