import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../slices/masterSlice';

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActiveLink("home"))
    }, [])

    return (
        <>
            <h1>Главная страница</h1>
            <p>Добро пожаловать на главную страницу приложения.</p>
        </>
    );
}