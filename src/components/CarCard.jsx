import React from 'react'

/**
 * Компонент рендерит карточку персоны
 */
export default function CarCard(props) {

    const { car } = props;

    return (
        <div>
            <h4 className="subtitle is-5">{car.brand + " " + car.model + " " + car.color}</h4>
            <p>
                {"passport number: " + car.number}
            </p>
        </div>
    )
}