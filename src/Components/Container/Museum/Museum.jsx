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
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.img} alt="museum"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
                    <>
                        <button onClick={props.handleSubmit}>Сохранить</button>
                        <Input text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleFocus} handleChange={props.handleChange} />

                        <Textarea text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleFocus} handleChange={props.handleChange} />


                        <Input text={'Фотография'} type={'file'} name={'img'} handleFocus={props.handleFocus} handleChange={props.handleChangeFile} />
                        {
                            props.isPhotoTypeWrong &&
                                <div className='form__wrong'>
                                    Выберите картинку
                                </div>
                        }
                    </>

            }


            <div className={s.locationContainer}>
                {
                    props.locations &&
                    props.locations.map(l => {
                        return (
                            <div key={l.id} className={s.location}>
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
