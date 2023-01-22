import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
}

// createSlice is A function that accepts an initial state, an object of reducer functions, and a "slice name", 
//and automatically generates action creators and action types that correspond to the reducers and state.
// This API is the standard approach for writing Redux logic.
// Internally, it uses createAction and createReducer

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = {...state.user, ...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {}
      state.isLoggedIn = false
    }
  }
})

export const {signIn, signOut} = userSlice.actions
export default userSlice.reducer