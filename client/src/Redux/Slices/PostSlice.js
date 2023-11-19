import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url='http://localhost:3001';
let token=JSON.parse(localStorage.getItem('token'));

export const createPost = createAsyncThunk(
    'post/createPost',
    async (form, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${url}/post/create`,
                form,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return res.data;
        } catch (err) {
            const errorMessage = err?.response?.data?.message ||
                'please double check your credentials';
            console.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getAllPosts= createAsyncThunk(
    'post/getAllPosts',
    async()=>{
        try{
            const res= await axios.get(`${url}/post/posts`);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const getPostById= createAsyncThunk(
    'post/getPostById',
    async(id)=>{
        try{
            const res= await axios.get(`${url}/post/${id}`);
            return res.data
        }catch (err){
            const errorMessage = err?.response?.data?.message ||
            'please double check your credentials';
            console.error(errorMessage);
            throw err;
        } 
    }
);

export const likePost= createAsyncThunk(
    'post/likePost',
    async(id)=>{
        try{
            const res= await axios.put(`${url}/post/like/${id}`,
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

export const unlikePost= createAsyncThunk(
    'post/unlikePost',
    async(id)=>{
        try{
            const res= await axios.put(`${url}/post/unlike/${id}`,
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

export const addComent= createAsyncThunk(
    'post/addComent',
    async(data)=>{
        console.log('data',data)
        const comment = data.content
        console.log(comment)
        try{
            const res= await axios.put(`${url}/post/comment/${data.postId}`,
                {comment},
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




const PostSlice = createSlice({
    name:"post",
    initialState:{
        isAuthenticated: false,
        post: {}
    },
    reducers:{},

    extraReducers:{
        [createPost.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [createPost.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [createPost.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

        [getAllPosts.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [getAllPosts.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [getAllPosts.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

        [getPostById.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [getPostById.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [getPostById.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

        [likePost.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [likePost.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [likePost.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

        [unlikePost.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [unlikePost.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [unlikePost.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

        [addComent.pending]: (state,action)=>{
            state.post = action.payload
            console.log("pending")
        },
        [addComent.fulfilled]: (state,action)=>{
            state.post = action.payload
            console.log("fulfilled")
        },
        [addComent.rejected]: (state,action)=>{
            state.post = action.payload
            console.log("rejected")
        },

    }
});



export default PostSlice.reducer;