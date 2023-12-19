import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../store/store';
import { ClipLoader } from 'react-spinners';
import { updateCourse } from '../store/store';

function CourseDetails() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { isError, isLoading, data } = useSelector((state) => {
        return state.courseDetails;
    })

    useEffect(() => {
        dispatch(fetchCourseDetails(courseId));
    }, [dispatch, courseId]);

    const handleEnrollCourseSubmit = (id) => {
        dispatch(updateCourse({ enrollmentStatus: 'In Progress', id }));
    };

    const enrollmentStatus = {
        'Open': 'green',
        'In Progress': '#aa9b0f',
        'Closed': 'red',
    };
    if (isLoading) {
        return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <ClipLoader
                color='black'
                size={90}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }
    if (isError) {
        return 'Error';
    }
    return (
        <>
            <Header>
                <h1 className='details_heading'>
                    Course Details
                </h1>
            </Header>
            {data && (
                <>
                    <div className='details_main'>
                        <div className='details_main_name'>
                            <h1 style={{ fontSize: 55, marginBottom: 20 }}>{data.name}</h1>
                            <p style={{ fontSize: 30 }}>Entollment Status:<span style={{ marginLeft: 10, color: enrollmentStatus[data.enrollmentStatus] }}>{data.enrollmentStatus}</span></p>
                            <p style={{ fontSize: 20, marginTop: 20, color: '#525251' }}>{data.description}</p>
                            <p className='prerequisite_main'>Prerequisites</p>
                            {!isEmpty(data.prerequisites) && data.prerequisites.map((prerequisite, i) => (
                                <p className='prerequisite_item' key={i}>{prerequisite}</p>
                            ))}
                            {
                                data.enrollmentStatus !== 'In Progress' && (
                                    <button onClick={() => handleEnrollCourseSubmit(courseId)} className='complete-button enroll'> Enroll Course </button>
                                )
                            }
                        </div>
                        <img src={data.thumbnail} alt={data.name} className='details_image'></img>
                    </div>
                    <div className='details_snapshot_container'>
                        <div className='details_name'>
                            <i className="fa fa-clock-o"></i>
                            <p style={{ fontSize: 30, marginTop: 5 }}>{data.duration}</p>
                            <p style={{ fontSize: 20, marginTop: 2, color: '#525251' }}>Duration</p>
                        </div>
                        <div className='details_name'>
                            <i className="fa fa-user"></i>
                            <p style={{ fontSize: 30, marginTop: 5 }}>{data.instructor}</p>
                            <p style={{ fontSize: 20, marginTop: 2, color: '#525251' }}>Instructor</p>
                        </div>
                        <div className='details_name'>
                            <i className="fa fa-map-marker"></i>
                            <p style={{ fontSize: 30, marginTop: 5 }}>{data.location}</p>
                            <p style={{ fontSize: 20, marginTop: 2, color: '#525251' }}>Location</p>
                        </div>
                    </div>
                    <div className='details_syllabus_container'>
                        <h1>Course Content</h1>
                        <div>
                            <div className='details_syllabus_item'>
                                <p>Week</p>
                                <p>Content</p>
                                <p>Topic</p>
                            </div>
                            {!isEmpty(data.syllabus) && data.syllabus.map((value, key) => (
                                <div key={key} className='details_syllabus_item_active'>
                                    <p>{value.week}</p>
                                    <p>{value.content}</p>
                                    <p>{value.topic}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default CourseDetails