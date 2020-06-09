import { usersAPI } from '../api/api';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE-IS-FOLLOWING-IN-PROGRESS";

let initialState = {
    users: [
        // {id: 1, photoUrl: 'https://bnbduck.com/wp-content/uploads/2019/11/duckworth-profile-picture.jpg', followed: false, fullName: 'Dmitriy K.', status: 'I like soccer', location: {cityName: 'Minsk', countryName: 'Belarus'}},
        // {id: 2, photoUrl: 'https://bnbduck.com/wp-content/uploads/2019/11/duckworth-profile-picture.jpg', followed: true, fullName: 'Alexander S.', status: 'I am junior developer', location: {cityName: 'Moscow', countryName: 'Russia'}},
        // {id: 3, photoUrl: 'https://bnbduck.com/wp-content/uploads/2019/11/duckworth-profile-picture.jpg', followed: false, fullName: 'Viktor D.', status: 'I was in Washington DC', location: {cityName: 'kiev', countryName: 'Ukraine'}},
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state, 
                users: state.users.map(u => { //users: [...state.users] <--- они идентичны, но нам нужна копия определенного объекта
                    if (u.id === action.userId) {
                        return {...u, followed: true} // берем копию конкретного выбранного юзера
                    }
                    return u; // если id не совпадает, то возвращаем того же юзера
                }) 
            }
        case UNFOLLOW:
            return {
                ...state, 
                users: state.users.map(u => { //users: [...state.users] <--- они идентичны, но нам нужна копия определенного объекта
                    if (u.id === action.userId) {
                        return {...u, followed: false} // берем копию конкретного выбранного юзера
                    }
                    return u; // если id не совпадает, то возвращаем того же юзера
                }) 
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users 
            }   
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }  
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }     
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                isFollowingInProgress: action.isFetching 
                ? [...state.isFollowingInProgress, action.userId ]
                : state.isFollowingInProgress.filter(id => id !== action.userId) 
            }
        }          
        default:
            return state;    
    }
}

export const followActionCreator = (userId) => ({ type: FOLLOW, userId })
export const unfollowActionCreator = (userId) => ({ type: UNFOLLOW, userId})
export const setUsersActionCreator = (users) => ({type: SET_USERS, users})
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCountActionCreator = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount })
export const toggleIsFetchingActionCreator = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingInProgressActionCreator = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId })

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(currentPage));
            usersAPI.getUsers(currentPage, pageSize)
                .then((data) => {
                    dispatch(toggleIsFetchingActionCreator(false));
                    dispatch(setUsersActionCreator(data.items));
                    dispatch(setTotalUsersCountActionCreator(data.totalCount));
                });
    }
}

export const postFollowThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowingInProgressActionCreator(true, userId));
        usersAPI.postFollowUser(userId)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(followActionCreator(userId));
                }
                dispatch(toggleIsFollowingInProgressActionCreator(false, userId));
            });
    }
}

export const deleteUnfollowThunkCreator = (userId) => {
    return (dispatch) => {
    dispatch(toggleIsFollowingInProgressActionCreator(true, userId));
    usersAPI.deleteUnfollowUser(userId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowActionCreator(userId));
            }
            dispatch(toggleIsFollowingInProgressActionCreator(false, userId));
        });
    }
}




export default usersReducer;