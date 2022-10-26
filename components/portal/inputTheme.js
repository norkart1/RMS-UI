import React from 'react'
import styles from '../../styles/portals/input_theme.module.css'

function Input({ isDisabled = false, style , type = 'text', value, dropdownOpts, label, name, helper_text, handleOnChange, placeholder, status = 'normal', }) {
    if (type == "text")
        return (
            <div className={styles.page}>
                {label && <label htmlFor={name} >{label}</label>} <br />
                <input data-theme='text' type="text" name={name} id={name} autoComplete='off' value={value} disabled={isDisabled}
                    placeholder={placeholder} data-status={status} required onChange={ handleOnChange} style={style} />
                {helper_text && <p data-theme="helper" >{helper_text}</p>}
            </ div>)
    if (type == "password")
        return (
            < div className={styles.page}>
                {label && <label htmlFor={name} >{label}</label>} <br />                
                <input data-theme='text' type="password" name={name} id={name} value={value} disabled={isDisabled}
                    placeholder={placeholder} data-status={status} required onChange={handleOnChange}  style={style} />
                {helper_text && <p data-theme="helper" >{helper_text}</p>}
            </ div>)
    if (type == "dropdown") return (
        <div className={styles.page}>
            {label && <label htmlFor={name} >{label}</label>} <br />
            <select data-theme='dropdown' name={name} id={name} placeholder={placeholder} required disabled={isDisabled}
                onChange={handleOnChange}  style={style} value={value} >

                {dropdownOpts.map((option, index) => (
                    <option key={index} value={option?.id && option.id}>{option?.name &&option.name}</option>
                ))}

            </select>
            {helper_text && <p data-theme="helper" >{helper_text}</p>}
        </ div>)
    if (type == "file") return (
        < div className={styles.page}>
            {label && <label htmlFor={name} >{label}</label>} <br />
            <input data-theme='file' type="file" name={name} id={name} value={value} disabled={isDisabled}
                placeholder={placeholder} data-status={status} required onChange={handleOnChange}  style={style} />
            {helper_text && <p data-theme="helper" >{helper_text}</p>}
        </ div>)
    if (type == "date") return (
        < div className={styles.page}>
            {label && <label htmlFor={name} >{label}</label>} <br />
            <input data-theme='date' type="date" name={name} id={name} value={value} disabled={isDisabled}
                placeholder={placeholder} data-status={status} required onChange={handleOnChange}  style={style} />
            {helper_text && <p data-theme="helper" >{helper_text}</p>}
        </ div>)
    if (type == "time") return (
        < div className={styles.page}>
            {label && <label htmlFor={name} >{label}</label>} <br />
            <input data-theme='date' type="time" name={name} id={name} value={value} disabled={isDisabled}
                placeholder={placeholder} data-status={status} required onChange={handleOnChange}  style={style} />
            {helper_text && <p data-theme="helper" >{helper_text}</p>}
        </ div>)
}

export default Input