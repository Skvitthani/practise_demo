import {createSlice} from '@reduxjs/toolkit';

interface UserItem {
  email: string | number;
  password: string | number;
}

interface UserState {
  userData: UserItem[];
}
const initialState: UserState = {
  userData: [],
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    useraction: (state, action) => {
      state.userData.push(action.payload);
    },
  },
});

export const {useraction} = userReducer.actions;

export default userReducer.reducer;
