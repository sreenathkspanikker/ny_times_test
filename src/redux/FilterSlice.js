import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { baseUrl } from '../middleware/axiosManager';

const filterAction = createAsyncThunk('ap/search', async (e)=> {
    const apiKey = "ScCpGGM9NGlgi9S6SWlJZrTItkRUmWEo";
    const res = await  baseUrl.get(`/search/v2/articlesearch.json?q=${e}&&api-key=${apiKey}`);
    if (res)  return res
})

export const filterReducer = createSlice({
    name: 'search',
    initialState: {
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [filterAction.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload;
        },
        [filterAction.pending]: (state, action) => {
            state.loading = true
            state.data = action.payload;
        },
        [filterAction.rejected]: (state, action) => {
            state.loading = true
            state.data = action.payload;
            state.error = 'Some error accured';
        },
    }
})

export { filterAction }
export default filterReducer.reducer