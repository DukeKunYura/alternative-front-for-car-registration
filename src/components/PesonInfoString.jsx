import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Компонент рендерит строку с информацией о владельце и кнопкой перехода
 */
export default function PersonInfoString(props) {

    const { id, passportNumber, firstName, patronymic, surname } = props;

    const navigate = useNavigate();

    return (
        <tr>
            <td>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <div className="columns">
                            <div className="column">
                                <h4 className="subtitle is-5">{passportNumber}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{firstName}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{patronymic}</h4>
                            </div>
                            <div className="column">
                                <h4 className="subtitle is-5">{surname}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <a href="#" className="item"
                            onClick={() => {
                                navigate(`/person/:${id}`)
                            }}>Person card</a>
                    </div>
                    <div className="block">
                    </div>
                </div>
            </td>
        </tr>
    )
}