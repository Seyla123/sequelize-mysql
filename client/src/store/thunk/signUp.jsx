import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signUp = createAsyncThunk(
    "auth/signUp",
    async (userData) => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/users/signup", userData, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log('sign up ', response.data);
        
        return response.data;
      } catch (error) {
        console.log('sign up error', error);
        
      }
    }
  );

  export {signUp }