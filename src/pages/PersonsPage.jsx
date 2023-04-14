import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActivePersonAdder } from '../slices/masterSlice.js';
import NewPerson from '../components/NewPerson';
import Persons from '../components/Persons';


export default function PersonsPage() {

    const state = useSelector((state) => state.master);

    const dispatch = useDispatch();

    return (
        <>
            <h1>Персоны</h1>
            <button onClick={() => { dispatch(setIsActivePersonAdder(true)) }}>Добавить персону</button>
            {state.isActivePersonAdder && <NewPerson />}
            <Persons />
        </>
    );
}