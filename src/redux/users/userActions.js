import userActionTypes from "./userActionType";

export const setUser = (user) => ({ type: userActionTypes.SET_USER, payload: user })
export const clearUser = (user) => ({ type: userActionTypes.CLEAR_USER })