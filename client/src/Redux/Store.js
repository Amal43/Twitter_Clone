import {configureStore} from '@reduxjs/toolkit';
import authSlice from './Slices/AuthSlice';
import UserSlice from './Slices/UserSlice';
import PostSlice from './Slices/PostSlice';
import messageSlice from './Slices/MessageSlice'
import notificationSlice from './Slices/NotificationSlice';

export const Store = configureStore({
        reducer:{
                authSlice,
                UserSlice,
                PostSlice,
                messageSlice,
                notificationSlice
        },
});