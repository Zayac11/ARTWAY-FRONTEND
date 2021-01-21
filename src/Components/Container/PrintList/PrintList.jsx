import React from 'react';
import s from './PrintList.module.css'

const PrintList = (props) => {
    return (
        <div className={s.container}>
            {
                props.print.map(p => {
                    return (
                        <div className={s.printItem} key={p.id}>
                            <div className={s.title}>
                                {props.name}
                            </div>
                            <img className={s.img} src={props.img} alt="location"/>
                            <div>
                                {props.description}
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default PrintList;
