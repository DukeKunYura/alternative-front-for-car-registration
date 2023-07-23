import React, { useEffect, useState } from 'react';
import { setActiveLink } from '../slices/masterSlice';
import { useGetCarsQuery } from '../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveCarAdder } from '../slices/masterSlice';
import { useNavigate } from 'react-router-dom';
import NewCar from '../components/NewCar';
import Loader from '../components/Loader';
import CarCard from '../components/CarCard';

export default function CarsPage() {

    const state = useSelector((state) => state.master);

    const { data = [], isLoading, isSuccess } = useGetCarsQuery();

    const [cars = [], setCars] = useState();
    const [fullInfoInput, setFullInfoInput] = useState("");
    const [numberInput, setNumberInput] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleTransition = async () => {
        const host = import.meta.env.VITE_REACT_APP_HOST;
        const port = import.meta.env.VITE_REACT_APP_PORT;
        let car = await fetch(`http://${host}:${port}/car_number?number=${numberInput}`).then((res) => res.json());
        if (car.id) {
            navigate(`/car/:${car.id}`);
        }
    }

    useEffect(() => {
        if (fullInfoInput !== "") {
            let newArr = data.filter(item =>
                item.brand.toLowerCase().includes(fullInfoInput.toLowerCase())
                || item.model.toLowerCase().includes(fullInfoInput.toLowerCase()))
            setCars(newArr);
        } else { setCars(data) }
    }, [fullInfoInput])

    useEffect(() => {
        if (isSuccess) {
            setCars(data);
        }
    }, [data])

    useEffect(() => {
        dispatch(setActiveLink("cars"));
        dispatch(setIsActiveCarAdder(false));
    }, [])

    return (
        <div className="container">
            <div className="block">
                <div className="columns">
                    <div className="column is-three-quarters">
                        <input
                            className="input is-info"
                            type="text"
                            placeholder="Search"
                            value={fullInfoInput}
                            onChange={(e) => { setFullInfoInput(e.target.value) }}
                        />
                    </div>
                    <div className="column">
                        <div className="field has-addons">
                            <div className="control">
                                <input
                                    className="input is-info"
                                    type="text"
                                    placeholder="Find by number"
                                    value={numberInput}
                                    onChange={(e) => { setNumberInput(e.target.value) }} />
                            </div>
                            <div className="control"
                                onClick={handleTransition}>
                                <a className="button is-info">
                                    Find
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {!state.isActiveCarAdder &&
                        <div className="box">
                            <div className="control">
                                <button className="button is-link is-light"
                                    onClick={() => { dispatch(setIsActiveCarAdder(true)) }}>Add new car</button>
                            </div>
                        </div>
                    }
                    {state.isActiveCarAdder && <NewCar />}
                    {isLoading && <Loader />}
                    {cars.map(car => (
                        <div className="box"
                            key={car.id}
                            onClick={() => { navigate(`/car/:${car.id}`) }}>
                            <CarCard car={car} />
                        </div>
                    ))}
                    {cars.length === 0 && !isLoading &&
                        <div className="box">
                            <h4 className="subtitle is-5">
                                The list is empty
                            </h4>
                        </div>
                    }
                </div>
            </div>
        </div >

    );
}