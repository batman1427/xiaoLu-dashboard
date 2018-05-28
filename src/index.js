import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import MainPanel  from './component/dashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><MainPanel/></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
