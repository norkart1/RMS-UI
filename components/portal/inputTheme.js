import React from 'react'

function Input({ type = 'text', label = 'Label', name, helper_text, handleOnChange, placeholder = 'here is place holder', status = 'normal', defaultValue = '' }) {
    if (type == "text")
        return (
            < div >
                <label htmlFor={name} >{label}</label><input theme='text' type="text" name={name}  id={name} placeholder={placeholder} status={status} required onChange={handleOnChange} />
                <p theme="helper" >{helper_text}</p>
            </ div>)
    if (type == "password")
        return (
            < div >
                <label htmlFor={name} >{label}</label><input theme='text' type="password" name={name} defaultValue={defaultValue} id={name} placeholder={placeholder} status={status} required onChange={handleOnChange} />
                <p theme="helper" >{helper_text}</p>
            </ div>)
    if (type == "dropdown") return (
        < div >
            <label htmlFor={name} >{label}</label><select theme='text' name={name} defaultValue={defaultValue} id={name} placeholder={placeholder} status={status} required onChange={handleOnChange} >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
            <p theme="helper" >{helper_text}</p>
        </ div>)




}

export default Input