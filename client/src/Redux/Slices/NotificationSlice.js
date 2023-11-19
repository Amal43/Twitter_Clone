import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        notifications: [],
    },
    reducers:{
        addNotify: (state,action) =>{
            const { notify } = action.payload;
            state.notifications.push(notify);
            // console.log(state.notifications)
        },
        clearNotify:(state)=>{
            state.notifications =[];
        }
    },
    extraReducers:{
    }
});
export const { addNotify ,clearNotify} = notificationSlice.actions;

export default notificationSlice.reducer;