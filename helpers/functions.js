import { useState } from "react";
import React from 'react';
import baseApi from '../api/baseApi';
import { useEffect } from "react";

const useLocalStorage =(key, initialValue)=> {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
    }
  };
  return [storedValue, setValue];
}
const objToFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objToFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
}

const onlyNumbers = (string) => {
  return string.replace(/\D/g, "");
}

const useGet = (url, needSessionID, firstAction , thenAction, catchAction, finalAction) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    firstAction && firstAction();
    baseApi.get(url + (needSessionID ? `?session_id=${localStorage.getItem('sessionID')}` : ''))
      .then((res) => setData(res.data.data))
      .then(thenAction && thenAction())
      .catch((err)=>{
        (err) => toast.error(err.response.data.data)
        catchAction && catchAction()
      })
      .finally(finalAction && finalAction())
  }, [url]);
  return [data];
};
  
export {useLocalStorage, objToFormData,onlyNumbers, useGet};
