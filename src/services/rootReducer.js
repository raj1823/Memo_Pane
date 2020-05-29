import React from 'react'
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk  from 'redux-thunk'
import data_Reducer from './Data/reducer'
import authenticate_Reducer from './Authentication/reducer'
//import AsyncStorage from '@react-native-community/async-storage';
 //import storage from 'redux-persist/es/storage'
//import { persistStore, persistReducer } from 'redux-persist';


const reducer= combineReducers({authenticate_Reducer,data_Reducer})



// const persistConfig = {
//     key: "root123",
//     storage : AsyncStorage,
//     whitelist :["authenticate_Reducer","data_Reducer"]
// }

// const persistedReducer = persistReducer(persistConfig,reducer)
const store = createStore(
    
    reducer,
    applyMiddleware(thunk))

    //let persistor = persistStore(store)
export default store