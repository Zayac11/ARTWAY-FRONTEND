import React from 'react';
import s from './Museum.module.css'
import Input from "../../../Common/Input/Input";
import Textarea from "../../../Common/Textarea/Textarea";

const Museum = (props) => {
    return (
        <div className={s.museum}>
            {
                !props.isChanging ?
                    <>
                        <button onClick={props.toggleIsChanging}>Изменить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.img} alt="museum"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
                    <>
                        <button onClick={props.toggleIsChanging}>Сохранить</button>
                        <Input text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={props.type} name={'name'} handleFocus={props.handleFocus} handleChange={props.handleChange} />

                        <Textarea text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleFocus} handleChange={props.handleChange} />

                        <div>Фотография</div>
                        <input type="file"/>
                    </>

            }


            <div className={s.locationContainer}>
                {
                    props.locations &&
                    props.locations.map(l => {
                        return (
                            <div className={s.location}>
                                <div className={s.locationTitle}>
                                    {l.name}
                                </div>
                                <img src={l.img} alt="location"/>
                                <div>
                                    {l.description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default Museum;
