import './App.css';
import { Routes, Route } from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Courses />} />
      <Route
        path="/course/:courseId"
        element={<CourseDetails />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default App;
