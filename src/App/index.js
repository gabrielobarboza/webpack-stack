import Path from 'path';
import React from 'react';
import ReactDOM from 'react-dom';

import 'App/services/LoadImages';

import 'Styles/main.scss';
import App from 'App/templates/App'

ReactDOM.render(<App />, document.getElementById('App'));