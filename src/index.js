import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import First from "./First"
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<First />, document.getElementById('root'));
ReactDOM.render(<p style={{textAlign:"center"}}><small>Developed by Alameddin Çelik</small></p>, document.getElementById('rootUp'));
registerServiceWorker();
