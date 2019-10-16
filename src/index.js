import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './assets/css/style.scss';
import App from './components/App';
import rootReducer from './reducers';

import * as serviceWorker from './serviceWorker';

const initialState = {
    formula: "",
    evaluated: false,
    previousResult: "",
    result: "",
    isHistoryView: false,
    history: []
};

const store = createStore(rootReducer, initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();