import { combineReducers } from 'redux'
import authReducer from './authReducer'
import postReducer from './postReducer'
import notificationReducer from './notificationReducer'
import profileReducer from './profileReducer'

export const reducers = combineReducers({ authReducer, postReducer, notificationReducer, profileReducer })
