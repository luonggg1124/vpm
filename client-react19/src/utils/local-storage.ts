export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key) || null;
};

export const removeLocalStorage = (key: string | string[]) => {
  if (Array.isArray(key)) {
    key.forEach((item) => localStorage.removeItem(item));
    return;
  }
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
    localStorage.clear();
}