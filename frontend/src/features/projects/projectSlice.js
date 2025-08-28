// projectSlice.js - Redux slice for project management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get(`${API_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createProject = createAsyncThunk('projects/createProject', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${API_URL}/api/projects`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editProject = createAsyncThunk('projects/editProject', async ({ id, data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.put(`${API_URL}/api/projects/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${API_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Fetch failed';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editProject.fulfilled, (state, action) => {
        const idx = state.items.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
