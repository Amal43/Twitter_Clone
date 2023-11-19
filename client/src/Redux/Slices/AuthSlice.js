import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';



const url='http://localhost:3001';

export const registerUser= createAsyncThunk(
    'auth/registerUser',
    async(form)=>{
        console.log(form)
        try{
            const res= await axios.post(`${url}/auth/register`,form);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const loginUser= createAsyncThunk(
    'auth/loginUser',
    async(loginData)=>{
        console.log(loginData)
        try{
            const res= await axios.post(`${url}/auth/login`,loginData);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
                                'please double check your credentials';
            console.error(errorMessage);
            toast.error(errorMessage);
            throw err;
        } 
    }
);

const authSlice = createSlice({
    name:"authUser",
    initialState:{
        isAuthenticated: false,
        authUser: {}
    },
    reducers:{
        logoutUser: (state) => {
            state.authUser = {};
        },
    },
    extraReducers:{
        [registerUser.pending]: (state,action)=>{
            state.authUser = action.payload
            console.log("pending")
        },
        [registerUser.fulfilled]: (state,action)=>{
            state.authUser = action.payload
            toast.success('Register successfully');
            console.log("fulfilled")
        },
        [registerUser.rejected]: (state,action)=>{
            state.authUser = action.payload
            console.log("rejected")
        },

        [loginUser.pending]: (state,action)=>{
            state.authUser = action.payload
            console.log("pending")
        },
        [loginUser.fulfilled]: (state,action)=>{
            state.authUser = action.payload
            const userId= action.payload.data._id
            const token=action.payload.token
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('userId', JSON.stringify(userId));
            toast.success('Log in successfully');
            console.log("fulfilled")
        },
        [loginUser.rejected]: (state,action)=>{
            state.authUser = action.payload
            console.log(action.payload)
            console.log("rejected")
        },
    }
});


export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;