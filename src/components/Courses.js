import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from './Header';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../store/store';
import { isEmpty } from 'lodash';

function Courses() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const coursesList = useSelector((state) => {
        return state.courses.data;
    });


    useEffect(() => {
        dispatch(fetchCourse());
    }, [dispatch]);
    return (
        <>
            <Header>
                <input
                    type="text"
                    name="nameInput"
                    className='input'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Search based on course-name/instructor'
                />
            </Header>
            <div className='course_list'>
                {!isEmpty(coursesList) && coursesList.filter((value) => {
                    if (value.name.includes(inputValue) || value.instructor.includes(inputValue)) {
                        return value;
                    } else if (inputValue === '') {
                        return value;
                    }
                    return '';
                })
                    .map((value) => (
                        <Link to={`/course/${value.id}`} className='course_item' key={value.id}>
                            <img className='image' src={value.thumbnail} alt={value.name}></img>
                            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                {value.name}
                            </p>
                            <span>{value.instructor}</span>
                        </Link>
                    ))}
            </div>
        </>
    )
}

export default Courses