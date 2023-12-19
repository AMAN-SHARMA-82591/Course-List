import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer, courseDetailsReducer } from './slice/course';

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        courseDetails: courseDetailsReducer,
    },
})

export * from './slice/course';