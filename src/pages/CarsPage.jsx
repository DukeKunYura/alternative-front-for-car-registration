import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveCarAdder } from '../slices/masterSlice';
import NewCar from '../components/NewCar';
import Cars from '../components/Cars';


export default function CarsPage() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    return (
        <>
            <h1>Автомобили</h1>
            <button onClick={() => { dispatch(setIsActiveCarAdder(true)) }}>Добавить авто</button>
            {state.isActiveCarAdder && <NewCar />}
            <Cars />
        </>
    );
}
