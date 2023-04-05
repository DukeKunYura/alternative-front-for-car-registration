import React from 'react';
import NewCar from '../components/NewCar';
import Cars from '../components/Cars';


export default function CarsPage() {
    return (
        <>
            <h1>Автомобили</h1>
            <NewCar />
            <Cars />
        </>
    );
}
