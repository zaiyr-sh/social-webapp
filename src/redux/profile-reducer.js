import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = "DELETE-TEST";

let initialState = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 0},
        {id: 2, message: 'It\'s my post', likesCount: 12},
    ],
    // newPostText: 'IT Courses',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 7
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost], //создаем копию postsData и пушим новый пост в копию
                // newPostText: ""
            }; //создаем копию state, т.к ф-я должна быть чистой
        // case UPDATE_NEW_POST_TEXT:
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     } //создаем копию state
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        default:
            return state;    
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
// export const updatePostActionCreator = (acceptingPostMessage) => 
//     ({ type: UPDATE_NEW_POST_TEXT, newText: acceptingPostMessage })

export const setUserProfileActionCreator = (profile) => ({type: SET_USER_PROFILE, profile })
export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
                dispatch(setUserProfileActionCreator(response.data));
} // Thunk creator - ф-я, которая возвращает Thunk. Thunk - это ф-я, которая принимает dispatch и делает внутри асинхронные операции и различные мелкие actions

export const setUserStatusActionCreator = (status) => ({type: SET_STATUS, status})
export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
                dispatch(setUserStatusActionCreator(response.data));
}
export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
                if(response.data.resultCode === 0){
                    dispatch(setUserStatusActionCreator(status));
                }
}

export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId})

export default profileReducer;