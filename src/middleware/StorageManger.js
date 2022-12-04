// SET VALUES
export const SET_VALUES = (key, data) => {
  localStorage.removeItem(key);
  const values = JSON.stringify(data);
  localStorage.setItem(key, values);
};

// GET VALUES
export const GET_VALUES = (key) => JSON.parse(localStorage.getItem(key));

// REMOVE VALUES
export const REMOVE_VALUES = (key) => localStorage.removeItem(key);
