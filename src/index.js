import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './stylesheets/index.css';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {takeHomeSalaryApp} from "./redux-store/reducers";

let store = createStore(takeHomeSalaryApp);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
