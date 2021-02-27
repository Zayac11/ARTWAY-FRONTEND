import React from 'react';
import s from './InputFile.module.css'

const InputFile = (props) => {
    return (
        <div className={s.file}>
            <div className={s.fileContainer}>
                <input type="file" name={props.name} id={props.id} onChange={props.handleChangeFile} onFocus={props.handleFocus} className={s.fileInput}/>
                <label htmlFor={props.id}>
                    {
                        props.file !== null &&
                        <span>{props.text2}</span>
                    }
                    {
                        props.file === null &&
                            <span>{props.text1}</span>
                    }
                </label>
                {
                    props.file !== null &&
                    props.file.length > 0 &&
                    <a className={s.openLink} href={props.file} rel={'noreferrer noopener'} target={'_blank'}>Открыть</a>
                }
            </div>
            {
                props.file !== null &&
                <button className={s.deleteBtn} onClick={() => props.handleDelete(props.name)}>Удалить</button>
            }
            {
                props.file !== null && props.file.name &&
                <span className={s.fileName}>{props.file.name}</span>
            }
        </div>
    );
}

export default InputFile;
