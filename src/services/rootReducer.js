import React from 'react'
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk  from 'redux-thunk'
import data_Reducer from './Data/reducer'
import authenticate_Reducer from './Authentication/reducer'
import AsyncStorage from '@react-native-community/async-storage';
// import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';


const reducer= combineReducers({authenticate_Reducer,data_Reducer})



const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,reducer)
const store = createStore(
    persistedReducer,
    {}
    
    ,compose(applyMiddleware(thunk)))

    let persistor = persistStore(store)
export {store,persistor} 