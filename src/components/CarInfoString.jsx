import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент рендерит строку с информацией об авто и кнопкой перехода
 */
export default function CarInfoString(props) {

    const { id, number, brand, model, color } = props;

    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column">
                                <h4 className="subtitle is-5">{number}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{brand}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{model}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{color}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <a href="#" className="item"
                            onClick={() => {
                                navigate(`/car/:${id}`)
                            }}>Car card</a>
                    </div>
                    <div className="block">
                    </div>
                </div>
            </td>
        </tr>
    )
}