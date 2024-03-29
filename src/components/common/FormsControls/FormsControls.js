import React from 'react';
import styles from './FormControls.module.css';

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props; //restProps - оставшиеся данные
    return (
        <FormControl {...props}><textarea {...restProps} {...input} /></FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props; //restProps - оставшиеся данные
    return (
        <FormControl {...props}><input {...restProps} {...input} /></FormControl>
    )
}