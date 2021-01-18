import React from 'react';
import s from './WorkerProfile.module.css'

const WorkerProfile = (props) => {
    return (
        <div className={s.name}>
            <div>
                id: {props.id}
            </div>
            <div>
                {props.last_name} {props.first_name} {props.middle_name}
            </div>
            <button className={s.button} onClick={props.toggleIsChanging}>Изменить</button>
        </div>
    );
}

export default WorkerProfile;
