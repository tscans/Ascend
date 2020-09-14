import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import vault from './vault/vault';

vault.initializeApp();

declare global {
    interface Window { 
        vault: any;
        vaultListener:any;
    }
}

window.vault = vault;

ReactDOM.render(<App />, document.getElementById('root'));

