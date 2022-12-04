import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registration } from '../middleware/axiosManager'
import { SET_VALUES } from '../middleware';

const loginAction = createAsyncThunk('ap/login', async (e)=> {
    SET_VALUES('user', e)
    const res = await  registration.post("/login", e);
    if (res.access_token !== undefined) {
        return res
    } else {
        return res
    }
})

export const loginSliceReducer = createSlice({
    name: 'authData',
    initialState: {
        data: null,
        error: '',
        loading: false
    },
    extraReducers: {
        [loginAction.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload;
        },
        [loginAction.pending]: (state, action) => {
            state.loading = true
        },
        [loginAction.rejected]: (state, action) => {
            state.loading = true
            state.error = 'Some error accured';
        },
    }
})

export { loginAction }
export default loginSliceReducer.reducer