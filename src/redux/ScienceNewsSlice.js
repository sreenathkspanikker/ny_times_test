import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../middleware/axiosManager';

const scienceNewsAction = createAsyncThunk('ap/scienceNews', async ()=> {
    const apiKey = "ScCpGGM9NGlgi9S6SWlJZrTItkRUmWEo";
    const res = await  baseUrl.get(`/topstories/v2/science.json?api-key=${apiKey}`);
    if (res)  return res
})

export const scienceNewsReducer = createSlice({
    name: 'scienceNews',
    initialState: {
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [scienceNewsAction.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload;
        },
        [scienceNewsAction.pending]: (state, action) => {
            state.loading = true
        },
        [scienceNewsAction.rejected]: (state, action) => {
            state.loading = true
            state.error = 'Some error accured';
        },
    }
})

export { scienceNewsAction }
export default scienceNewsReducer.reducer