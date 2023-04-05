import React from 'react';
import NewPerson from '../components/NewPerson';
import Persons from '../components/Persons';


export default function PersonsPage() {
    return (
        <>
            <h1>Персоны</h1>
            <NewPerson />
            <Persons />
        </>
    );
}