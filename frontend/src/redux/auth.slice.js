import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authenticated: false,
    // subscriptionStatus: 'inactive', // Initialize subscription status as 'inactive'
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authenticated = action.payload ? true : false;
    },

    setUpdatedUser: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
    },

    // // Extend the authSlice with a new action to set the subscription status
    // setSubscriptionStatus: (state, action) => {
    //   state.subscriptionStatus = action.payload;
    // },

    logOutUser: (state) => {
      state.user = null;
      state.authenticated = false;
      // state.subscriptionStatus = 'inactive'; // Reset the subscription status upon logout
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setUser, logOutUser } = authSlice.actions;
