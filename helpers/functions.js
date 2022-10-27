import { useEffect, useState } from "react";
import React from 'react';
import baseApi from '../api/baseApi';
import { toast } from "react-toastify";

const useLocalStorage = (key, initialValue) => {
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
const downloadExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "DataSheet.xlsx");
};
const useGet = (url, needSessionID, firstAction, thenAction, catchAction, finalAction) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    firstAction && firstAction();
    baseApi.get(url + (needSessionID ? localStorage.getItem('sessionID') : ''))//`?session_id=${localStorage.getItem('sessionID')}` : ''))
      .then((res) => setData(res.data.data))
      .then(thenAction && thenAction())
      .catch((err) => {
        (err) => toast.error(err.response.data.data)
        catchAction && catchAction()
      })
      .finally(finalAction && finalAction())
  }, [url]);
  return [data];
};

const apiPost = async (url, data, includeFile, thenAction, catchAction, finalAction) => {
  baseApi.post(url, includeFile ? await objToFormData(data) : data, includeFile && {
    headers: {
      "Content-Type": "multipart/form-data",
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async (res) => {
      toast.success('Added Successfully')
      thenAction && thenAction(res)
    })
    .catch((err) => {
      catchAction && catchAction(err)
      const errorMessage = err.response.data.data
      typeof errorMessage != 'string' ? err.response.data.data.map((item, index) => {
        toast.error(item)
      }) :
        toast.error(errorMessage)
    }
    )
    .finally(async () => {
      finalAction()
      // loadTableData()
      // setSubmitting(false)
    }
    )
}
const apiPatch = async (url, data, includeFile, thenAction, catchAction, finalAction) => {
  baseApi.patch(url, includeFile ? await objToFormData(data) : data, includeFile && {
    headers: {
      "Content-Type": "multipart/form-data",
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async (res) => {
      toast.success('Editted Successfully')
      thenAction && thenAction(res)
    })
    .catch((err) => {
      catchAction && catchAction(err)
      const errorMessage = err.response.data.data
      typeof errorMessage != 'string' ? err.response.data.data.map((item, index) => {
        toast.error(item)
      }) :
        toast.error(errorMessage)
    }
    )
    .finally(async () => {
      finalAction && finalAction()
      // loadTableData()
      // setSubmitting(false)
    }
    )
  }
  const apiDelete = (url, id, thenAction, catchAction, finalAction) => {
    baseApi.delete(`${url + id}`)
      .then(async (res) => {
        thenAction && thenAction(res)
        toast.success('Deleted Successfully')
      })
      .catch((err) => {
        catchAction && catchAction(err)
        const errorMessage = err.response.data.data
        typeof errorMessage != 'string' ? err.response.data.data.map((item, index) => {
          toast.error(item)
        }) :
          toast.error(errorMessage)
      })
      .finally(() => {
        finalAction && finalAction()
      })
  }

export { useLocalStorage, objToFormData, onlyNumbers, useGet, apiPost, apiPatch, apiDelete, downloadExcel };
