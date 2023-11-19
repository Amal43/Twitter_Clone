import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url='http://localhost:3001';
let token=JSON.parse(localStorage.getItem('token'));
let userId=JSON.parse(localStorage.getItem('userId'));

export const getUserCons= createAsyncThunk(
    'con/getUserCons',
    async()=>{
        try{
            const res= await axios.get(`${url}/con/${userId}`);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const getMessages= createAsyncThunk(
    'msg/getMessages',
    async(id)=>{
        try{
            const res= await axios.get(`${url}/msg/${id}`);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const sendMessage= createAsyncThunk(
    'msg/sendMessage',
    async(message)=>{
        try{
            const res= await axios.post(`${url}/msg/create`,message);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const createConversation= createAsyncThunk(
    'con/create',
    async(id)=>{
        console.log(id)
        try{
            const res= await axios.post(`${url}/con/create`,
                {id},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            
            );
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);






const messageSlice = createSlice({
    name:"msg",
    initialState:{
        msg: {}
    },
    reducers:{
    },
    extraReducers:{
        [getUserCons.pending]: (state,action)=>{
            state.msg = action.payload
            console.log("pending")
        },
        [getUserCons.fulfilled]: (state,action)=>{
            state.msg = action.payload
            console.log("fulfilled")
        },
        [getUserCons.rejected]: (state,action)=>{
            state.msg = action.payload
            console.log("rejected")
        },

        [getMessages.pending]: (state,action)=>{
            state.msg = action.payload
            console.log("pending")
        },
        [getMessages.fulfilled]: (state,action)=>{
            state.msg = action.payload
            console.log("fulfilled")
        },
        [getMessages.rejected]: (state,action)=>{
            state.msg = action.payload
            console.log("rejected")
        },

        [sendMessage.pending]: (state,action)=>{
            state.msg = action.payload
            console.log("pending")
        },
        [sendMessage.fulfilled]: (state,action)=>{
            state.msg = action.payload
            console.log("fulfilled")
        },
        [sendMessage.rejected]: (state,action)=>{
            state.msg = action.payload
            console.log("rejected")
        },

        [createConversation.pending]: (state,action)=>{
            state.msg = action.payload
            console.log("pending")
        },
        [createConversation.fulfilled]: (state,action)=>{
            state.msg = action.payload
            console.log("fulfilled")
        },
        [createConversation.rejected]: (state,action)=>{
            state.msg = action.payload
            console.log("rejected")
        },
    
    
    }
});



export default messageSlice.reducer;