import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../middleware/axiosManager';

const topNewsAction = createAsyncThunk('ap/topNews', async ()=> {
    const apiKey = "ScCpGGM9NGlgi9S6SWlJZrTItkRUmWEo";
    const res = await  baseUrl.get(`/topstories/v2/home.json?api-key=${apiKey}`);
    if (res)  return res
})

export const topNewsReducer = createSlice({
    name: 'topNews',
    initialState: {
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [topNewsAction.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload;
        },
        [topNewsAction.pending]: (state, action) => {
            state.loading = true
        },
        [topNewsAction.rejected]: (state, action) => {
            state.loading = true
            state.error = 'Some error accured';
        },
    }
})

export { topNewsAction }
export default topNewsReducer.reducer