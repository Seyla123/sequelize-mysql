import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Create an async thunk for fetching users
const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        // Make the API call with credentials and appropriate headers
        const response = await axios.get(`${API_BASE_URL}/users`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const fetchedData = response.data.data;
        // Log the response for debugging
        console.log('Fetched users:', fetchedData);
        
        //await pause(1000);
        // Return the users data
        return fetchedData['users']; // Assuming response.data has a 'users' property
    } catch (error) {
        // Handle errors gracefully
        console.log('Error fetching users:', error);
        
        if (axios.isAxiosError(error)) {
            // If it's an Axios error, return the response or message
            throw new Error(error.response?.data?.message || 'Failed to fetch users');
        } else {
            // For other errors, throw a generic error
            throw new Error('An unexpected error occurred');
        }
    }
});

export { fetchUsers };

const pause = (duration)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, duration);
    })
}

