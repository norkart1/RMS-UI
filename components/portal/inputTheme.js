import React from 'react'
import styles from '../../styles/portals/input_theme.module.css'

function Input({isDisabled = false, type = 'text', value, dropdownOpts, label = 'Label', name, helper_text, handleOnChange, placeholder, status = 'normal', }) {
    if (type == "text")
        return (
            <div className={styles.page}>
                <label htmlFor={name} >{label}</label> <br />
                <input theme='text' type="text" name={name} id={name}  autoComplete= 'off' value={value}  disabled={isDisabled}
                    placeholder={placeholder} status={status} required onChange={handleOnChange} />
                {helper_text && <p theme="helper" >{helper_text}</p>}
            </ div>)
    if (type == "password")
        return (
            < div className={styles.page}>
                <label htmlFor={name} >{label}</label> <br />
                <input theme='text' type="password" name={name} id={name} value={value}  disabled={isDisabled}
                    placeholder={placeholder} status={status} required onChange={handleOnChange} />
                {helper_text && <p theme="helper" >{helper_text}</p>}
            </ div>)
    if (type == "dropdown") return (
        <div className={styles.page}>
            <label htmlFor={name} >{label}</label> <br />
            <select theme='dropdown' name={name} id={name} placeholder={placeholder} required  disabled={isDisabled}
                onChange={handleOnChange} value={value} >
             
                {dropdownOpts.map((option, index) => (
                    <option key={index}>{option}</option>
                ))
                }

            </select>
            {helper_text && <p theme="helper" >{helper_text}</p>}
        </ div>)
    if (type == "file") return (
        < div className={styles.page}>
            <label htmlFor={name} >{label}</label> <br />
            <input theme='file' type="file" name={name}  id={name} value={value}  disabled={isDisabled}
                placeholder={placeholder} status={status} required onChange={handleOnChange} />
                {helper_text && <p theme="helper" >{helper_text}</p>}
        </ div>)
    if (type == "date") return (
        < div className={styles.page}>
            <label htmlFor={name} >{label}</label> <br />
            <input theme='date' type="date" name={name} id={name} value={value}  disabled={isDisabled}
                placeholder={placeholder} status={status} required onChange={handleOnChange} />
                {helper_text && <p theme="helper" >{helper_text}</p>}
        </ div>)
}

export default Input