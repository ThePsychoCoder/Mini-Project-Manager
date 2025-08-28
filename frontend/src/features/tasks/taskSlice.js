// taskSlice.js - Redux slice for task management
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get(`${API_URL}/api/tasks/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async ({ projectId, data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post(`${API_URL}/api/tasks/${projectId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ taskId, data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return taskId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Fetch failed';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const idx = state.items.findIndex(t => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
