import React from 'react'

/**
 * Компонент рендерит карточку персоны
 */
export default function CarCard(props) {

    const { car } = props;

    return (
        <div>
            <h4 className="subtitle is-5">{car.brand + " " + car.model}</h4>
            <p>
                {"number: " + car.number + " color: " + car.color}
            </p>
        </div>
    )
}