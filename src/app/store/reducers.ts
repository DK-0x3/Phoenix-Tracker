import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from '../../entities/session/model/sessionSlice';

export const reducers = combineReducers({
	session: sessionSlice,
});