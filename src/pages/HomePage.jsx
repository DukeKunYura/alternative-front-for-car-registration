import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveLink } from '../slices/masterSlice';
import { AiFillCar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";

export default function HomePage() {

    const dispatch = useDispatch();

    const [counts, setCounts] = useState({})

    useEffect(() => {
        dispatch(setActiveLink("home"));

        const handleGetCounts = async () => {
            let personsCount = await fetch(`http://localhost:8080/persons_count`).then((res) => res.json());
            let carsCount = await fetch(`http://localhost:8080/cars_count`).then((res) => res.json());
            return { personsCount, carsCount }
        };
        handleGetCounts().then((res) => setCounts(res));
    }, [])

    return (
        <div className="box">
            <div className="block">
                <span className="button is-static is-medium is-fullwidth">
                    <span className="icon">
                        <BsPersonFill />
                    </span>
                    <span>Persons in database:</span>
                    <span className="icon" />
                    <h4>{counts.personsCount ? counts.personsCount : "-"}</h4>
                </span>
            </div>
            <div className="block">
                <span className="button is-static is-medium is-fullwidth">
                    <span className="icon">
                        <AiFillCar />
                    </span>
                    <span>Cars in database:</span>
                    <span className="icon" />
                    <h4>{counts.carsCount ? counts.carsCount : "-"}</h4>
                </span>
            </div>
        </div>
    );
}