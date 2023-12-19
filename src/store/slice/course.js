import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourse = createAsyncThunk('fetchCourse', async () => {
    const response = await axios.get('http://localhost:3006/courses');
    return response.data;
});

export const fetchCourseDetails = createAsyncThunk('fetchCourseDetails', async (courseId) => {
    const response = await axios.get(`http://localhost:3006/courses/${courseId}`);
    return response.data;
});

export const updateCourse = createAsyncThunk('updateCourse', async (course) => {
    const response = await axios.patch(`http://localhost:3006/courses/${course.id}`, course);
    return response.data;
})

const coursesSlice = createSlice({
    name: 'coursesList',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourse.pending, ((state) => {
            state.isLoading = true;
        }));
        builder.addCase(fetchCourse.fulfilled, ((state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }));
        builder.addCase(fetchCourse.rejected, ((state, action) => {
            console.error(action.payload);
            state.isLoading = false;
            state.isError = true;
        }));
        builder.addCase(updateCourse.pending, ((state) => {
            state.isLoading = true;
        }));
        builder.addCase(updateCourse.fulfilled, ((state, action) => {
            state.isLoading = false;
            const updatedCourse = action.payload;
            state.data = state.data.map((course) => course.id === updatedCourse.id ? updatedCourse : course);
        }));
        builder.addCase(updateCourse.rejected, ((state) => {
            state.isLoading = false;
            state.isError = true;
        }));
    }
});

const courseDetails = createSlice({
    name: 'courseDetails',
    initialState: {
        isError: false,
        isLoading: false,
        data: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCourseDetails.pending, ((state) => {
            state.isLoading = true;
        }));
        builder.addCase(fetchCourseDetails.fulfilled, ((state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }));
        builder.addCase(fetchCourseDetails.rejected, ((state) => {
            state.isLoading = false;
            state.isError = true;
        }));
        builder.addCase(updateCourse.pending, ((state) => {
            state.isLoading = true;
        }));
        builder.addCase(updateCourse.fulfilled, ((state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        }));
        builder.addCase(updateCourse.rejected, ((state) => {
            state.isLoading = false;
            state.isError = true;
        }));
    }
})

export const coursesReducer = coursesSlice.reducer;
export const courseDetailsReducer = courseDetails.reducer;
export const { updateStatus } = coursesSlice.actions;
