import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  name: string;
  email?: string | null;
  photo?: string | null;
};

export interface UserState {
  readonly data?: User | null;
  readonly isLoggedIn: boolean;
}

const initialState: UserState = {
  data: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { payload } = action;
      state = { data: payload, isLoggedIn: true };
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
