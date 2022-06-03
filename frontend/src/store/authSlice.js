import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: null
//     const isAuth = false;
//     const user ={
//     activated: true,
// };

}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default counterSlice.reducer