import {combineReducers, configureStore} from "@reduxjs/toolkit"
// import {profileCompletedSlice} from "./slices/profile_completion_slice"
import profileCompletedSliceReducer from "./slices/profile_completion_slice"
import {persistReducer} from "redux-persist"
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'

const encryptor =  encryptTransform({
    secretKey:"$asdkjf30sdfaksjfklfjsdfssdkfj",
    onError:function(error){
        console.log(error)
    }
})
const persistConfig = {
    key:'root',
    version:'1',
    storage,
    transforms:[encryptor]
}

const reducer = combineReducers({
    Profile:profileCompletedSliceReducer
})

const PersistReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
    reducer:PersistReducer
})

export default store;