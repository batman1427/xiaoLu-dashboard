import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Upload from './component/upload/Upload';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Upload />, document.getElementById('root'));
registerServiceWorker();
