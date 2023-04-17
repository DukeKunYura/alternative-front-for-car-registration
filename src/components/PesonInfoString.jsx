import React from 'react';
//import { useRemovalCarMutation } from '../redux/personApi';

/**
 * Компонент рендерит строку с информацией о владельце и кнопкой удаления
 */
export default function PersonInfoString(props) {

    const { passportNumber, firstName, patronymic, surname } = props;

    //const [removalCar, { isErrorRemoval }] = useRemovalCarMutation();

    // const handleDeleteCar = async (passport, number) => {
    //     await removalCar({ passport, number }).unwrap();
    // }

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
                                // handleDeleteCar(passportNumber, number) 
                            }}>Delete owner</a>
                    </div>
                    <div className="block">
                    </div>
                </div>
            </td>
        </tr>
    )
}