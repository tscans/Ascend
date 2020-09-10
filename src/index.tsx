import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import vault from './vault/vault';

vault.initializeApp();

ReactDOM.render(<App />, document.getElementById('root'));

