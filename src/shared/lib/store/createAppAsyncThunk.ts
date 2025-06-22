import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../app/store/store';

// Типизированный AsyncThunkConfig
export interface IThunkConfig {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: string; // Опционально, если используете rejectWithValue
}

// Обертка для createAsyncThunk
export const createAppAsyncThunk = createAsyncThunk.withTypes<IThunkConfig>();
