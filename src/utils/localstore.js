
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getItem = (key) => {
    let r = ''
    try {
      r = localStorage.getItem(key) || "";
      r = JSON.parse(r);
    }
    catch (e) {
    }
    return r
  };
  
  export const removeItem = (key) => {
    localStorage.removeItem(key);
  };
  
  export const setSessionItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  
  export const getSessionItem = (key) => {
    let r = ''
    try {
      r = sessionStorage.getItem(key) || ""
      r = JSON.parse(r);
    } catch (e) {
    }
    return r
  };
  export const removeSessionItem = (key) => {
    sessionStorage.removeItem(key);
  };
  
  export default {
    setItem,
    getItem,
    removeItem,
    setSessionItem,
    getSessionItem,
    removeSessionItem
  };
  