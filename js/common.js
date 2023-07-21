const $ = ele => document.querySelector(ele);

const $$ = ele => document.querySelectorAll(ele);

const getItem = key => JSON.parse(localStorage.getItem(key));

const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const removeItem = key => localStorage.removeItem(key);

function formatTime(time) {
    const date = new Date(time)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}