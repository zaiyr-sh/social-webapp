import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                // isAuth: true
            }; 
        default:
            return state;    
    }
}

export const setAuthUserDataActionCreator = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} })
export const getAuthUserDataThunkCreator = () => (dispatch) => {
    return authAPI.myUserData()
			.then((response) => {
				if (response.data.resultCode === 0) {
					let {id, email, login} = response.data.data; // destructuring
					dispatch(setAuthUserDataActionCreator(id, email, login, true)); 
				}
			});
}

// Thunk - ф-я, которая принимает метод dispatch
// ThunkCreator - ф-я, которая возвращает Thunk и может принимать что-то и это что-то дотсупно Thunk'е благодаря замыканию
export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {              
    authAPI.login(email, password, rememberMe)
			.then((response) => {
				if (response.data.resultCode === 0) {
					dispatch(getAuthUserDataThunkCreator());
				} else {
                    let message = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
                    dispatch(stopSubmit("login", {_error: message}));
                }
			});
}

export const logoutThunkCreator = () => (dispatch) => { 
    authAPI.logout()
			.then((response) => {
				if (response.data.resultCode === 0) {
					dispatch(setAuthUserDataActionCreator(null, null, null, false)); 
				}
			});
}

export default authReducer;