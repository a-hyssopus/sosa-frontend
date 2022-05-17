import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {store} from "./store/store"
import {Provider} from 'react-redux'

import './index.scss';
import App from './App';

ReactDOM.render(<BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="*" element={<App/>}/>
            </Routes>
        </Provider></BrowserRouter>,
    document.getElementById("root")
);
//
