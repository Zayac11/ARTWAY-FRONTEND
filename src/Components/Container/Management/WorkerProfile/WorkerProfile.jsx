import React from 'react';
import s from './WorkerProfile.module.css'
import next from './../../../../assets/images/inCard.svg'

const WorkerProfile = (props) => {
    return (
        <button onClick={props.toggleIsChanging} className={s.container}>
            <div className={s.title}>
                {props.text}
            </div>
            <div className={s.name}>
                {props.last_name} {props.first_name} {props.middle_name}
            </div>
            {
                !props.isUserServiceAdmin &&
                <img src={next} alt="go inside" className={s.btn}/>
            }

        </button>
    );
}

export default WorkerProfile;
