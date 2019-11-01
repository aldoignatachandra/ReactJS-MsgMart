import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './Components/Redux/store';

const WappedApp = () => {
    return (
        <Provider store = {store}>
            <AppRouter />
        </Provider>
    )
}

ReactDOM.render(<WappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
