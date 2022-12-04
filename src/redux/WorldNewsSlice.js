import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../middleware/axiosManager';

const worldNewsAction = createAsyncThunk('ap/worldNews', async ()=> {
    const apiKey = "ScCpGGM9NGlgi9S6SWlJZrTItkRUmWEo";
    const res = await  baseUrl.get(`/topstories/v2/world.json?api-key=${apiKey}`);
    if (res)  return res
})

export const worldNewsReducer = createSlice({
    name: 'worldNews',
    initialState: {
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [worldNewsAction.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload;
        },
        [worldNewsAction.pending]: (state, action) => {
            state.loading = true
        },
        [worldNewsAction.rejected]: (state, action) => {
            state.loading = true
            state.error = 'Some error accured';
        },
    }
})

export { worldNewsAction }
export default worldNewsReducer.reducer