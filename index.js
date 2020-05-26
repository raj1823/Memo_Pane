/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './router';
import {name as appName} from './app.json';

import {store,persistor} from './src/services/rootReducer'
import {Provider} from 'react-redux'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

const NotesApp = () => (
    <Provider store={store}>
        <PersistGate loading={null}
        persistor={persistor}></PersistGate>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => NotesApp);
