import Path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import 'App/services/LoadImages';

import 'Styles/main.scss';
import App from 'App/templates/App'
import reducers from 'App/Reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('App'));