

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));