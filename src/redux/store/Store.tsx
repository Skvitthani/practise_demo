import {configureStore} from '@reduxjs/toolkit';
import UserReducer from '../reducer/UserReducer';

const MyStore = configureStore({
  reducer: {
    user: UserReducer as any,
  },
});

export default MyStore;
