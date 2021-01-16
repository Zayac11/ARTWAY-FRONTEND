import React from 'react';
import s from './MuseumItemsList.module.css'

const MuseumItemsList = (props) => {
    return (
        <div key={props.id} className={s.location}>
            <div className={s.title}>
                {props.name}
            </div>
            <img className={s.img} src={props.img} alt="location"/>
            <div>
                {props.description}
            </div>

            {
                props.prev !== null &&
                <button onClick={() => props.swapLocations('up', props.id)}>вверх</button>
            }
            {
                props.id !== props.last &&
                <button onClick={() => props.swapLocations('down', props.id)}>вниз</button>
            }
        </div>

    );
}

export default MuseumItemsList;
