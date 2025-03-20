
"use client"
import { getCookie } from "@/components/ListLeads";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL


type profileType = {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

export const initialState: profileType = {
    id: "",
    fullName: "",
    email: "",
    role: "",
}

export const fetchProfile = createAsyncThunk(
  "profileSlice/fetchProfile",
  async () => {
    try {
        const token = getCookie("token-001");
      const response = await axios.get(`${apiUrl}/admins/profile` , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the daa di{}rectly
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Reject the thunk with error
    }
  }
);

const profileSlice = createSlice({
  initialState,
  name: "profileSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return (state = action.payload?.admin);
    });
  },
});

const {} = profileSlice.actions;
export default profileSlice.reducer;
