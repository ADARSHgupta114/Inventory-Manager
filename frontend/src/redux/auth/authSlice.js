import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn:false
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
})
export const {} = authSlice.actons;
export default  authSlice.reducers;