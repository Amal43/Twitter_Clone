import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const url='http://localhost:3001';
let userId=JSON.parse(localStorage.getItem('userId'));
let token=JSON.parse(localStorage.getItem('token'));


export const follow= createAsyncThunk(
    'user/follow',
    async(id)=>{
        console.log(id)
        try{
            const res= await axios.put(`${url}/user/follow/${id}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);



export const getAllUsers= createAsyncThunk(
    'user/getAllUsers',
    async()=>{
        try{
            const res= await axios.get(`${url}/user/allUsers`);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);


export const getOneUser = createAsyncThunk(
    'user/getOneUser',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${url}/user/${id}`);
            return res.data;
        } catch (err) {
            if (!err.response) {
            throw err;
            }
            const errorMessage = err.response.data.message || 'Please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const unfollow= createAsyncThunk(
    'user/unfollow',
    async(id)=>{
        try{
            const res= await axios.put(`${url}/user/unfollow/${id}`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
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

export const editProfile= createAsyncThunk(
    'user/editProfile',
    async(form,{ rejectWithValue })=>{
        try{
            const res= await axios.put(`${url}/user/update/${userId}`,
                form,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        } 
    }
);




const UserSlice = createSlice({
    name:"user",
    initialState:{
        isAuthenticated: false,
        user: {}
    },
    reducers:{},

    extraReducers:{

        [follow.pending]: (state,action)=>{
            state.user = action.payload
            console.log("pending")
        },
        [follow.fulfilled]: (state,action)=>{
            state.user = action.payload
            console.log("fulfilled")
        },
        [follow.rejected]: (state,action)=>{
            state.user = action.payload
            console.log("rejected")
        },

        [getAllUsers.pending]: (state,action)=>{
            state.user = action.payload
            console.log("pending")
        },
        [getAllUsers.fulfilled]: (state,action)=>{
            state.user = action.payload
            console.log("fulfilled")
        },
        [getAllUsers.rejected]: (state,action)=>{
            state.user = action.payload
            console.log("rejected")
        },

        [getOneUser.pending]: (state,action)=>{
            state.user = action.payload
            console.log("pending")
        },
        [getOneUser.fulfilled]: (state,action)=>{
            state.user = action.payload
            console.log("fulfilled")
        },
        [getOneUser.rejected]: (state,action)=>{
            state.user = action.payload
            console.log("rejected")
        },

        

        [unfollow.pending]: (state,action)=>{
            state.user = action.payload
            console.log("pending")
        },
        [unfollow.fulfilled]: (state,action)=>{
            state.user = action.payload
            console.log("fulfilled")
        },
        [unfollow.rejected]: (state,action)=>{
            state.user = action.payload
            console.log("rejected")
        },

        [editProfile.pending]: (state,action)=>{
            state.user = action.payload
            console.log("pending")
        },
        [editProfile.fulfilled]: (state,action)=>{
            state.user = action.payload
            console.log("fulfilled")
        },
        [editProfile.rejected]: (state,action)=>{
            state.user = action.payload
            console.log("rejected")
        },
    }
});



export default UserSlice.reducer;