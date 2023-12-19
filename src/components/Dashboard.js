import React, { useEffect } from 'react'
import Header from './Header'
import hatImage from '../images/graduation-hat.png';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { updateCourse, fetchCourse } from '../store/store';

function Dashboard() {
    const dispatch = useDispatch();
    const courseList = useSelector((state) => {
        return state.courses.data;
    });

    useEffect(() => {
        dispatch(fetchCourse());
    }, [dispatch]);

    const filteredList = !isEmpty(courseList) && courseList.filter((value) => (['In Progress', 'Closed']).includes(value.enrollmentStatus))

    const handleUpdateStatus = (id) => {
        dispatch(updateCourse({ enrollmentStatus: 'Closed', id }));
    }

    const enrollmentStatus = {
        'Open': 'green',
        'In Progress': '#d3a40b',
        'Closed': 'red',
    };

    return (
        <>
            <Header>
                <h1 className='details_heading'>
                    Dashboard
                </h1>
            </Header>
            <div className='dashboard-title'>
                <img src={hatImage} alt='hat' />
                <h1>Enrolled Courses</h1>
            </div>
            <div className='dashboard-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Instructor</th>
                            <th>Course</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isEmpty(filteredList)
                            ? filteredList.map((course) => (
                                <tr key={course.id}>
                                    <td style={{ color: enrollmentStatus[course.enrollmentStatus] }}>{course.enrollmentStatus}</td>
                                    <td>{course.instructor}</td>
                                    <td>{course.name}</td>
                                    <td>
                                        {course.enrollmentStatus !== 'Closed' && (
                                            <button onClick={() => handleUpdateStatus(course.id)} className='complete-button'>Complete</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                            : <tr>
                                <td>
                                    No Data Found
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard