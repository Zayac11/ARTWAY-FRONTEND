import React from 'react';
import s from './PrintList.module.css'

const PrintList = (props) => {
    return (
        <div className={s.container}>
            {
                props.print &&
                props.print.length > 0
                &&
                    <>
                        <button onClick={() => props.printArtifacts(props.print)}>Печать</button>
                        <button onClick={() => props.removeArtifactsToPrint()}>Удалить всё</button>
                    </>

            }

            {
                props.pdf !== '' &&
                    <div>
                        <a target={'_blank'} rel={'noreferrer noopener'} href={props.pdf}>Открыть pdf файл с qr-кодами артефактов</a>
                    </div>
            }

            {
                props.print &&
                (props.print.length > 0) ?
                        props.print.map(p => {
                            return (
                                <div className={s.printItem} key={p.id}>
                                    <div className={s.title}>
                                       Название: {p.name}
                                    </div>
                                    <div className={s.title}>
                                       id: {p.id}
                                    </div>
                                    <img className={s.img} src={p.img} alt="location"/>
                                    <button onClick={() => props.deleteOneArtifact(p.id)}>Удалить из печати</button>
                                </div>
                            )
                        })
                    :
                    <div>
                        Нет артефактов для печати
                    </div>
            }

        </div>
    );
}

export default PrintList;
