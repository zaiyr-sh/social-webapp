import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Hi, how are you?', likesCount: 0},
                {id: 2, message: 'It\'s my post', likesCount: 12},
            ],
            newPostText: 'IT Courses'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Christian'},
                {id: 2, name: 'Benjamin'},
                {id: 3, name: 'Tony'},
                {id: 4, name: 'Leonardo'},
                {id: 5, name: 'Tomas'},
                {id: 6, name: 'Tommy'}
            ],
            messagesData: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your courses?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Tell me sth'},
                {id: 5, message: 'See you'},
                {id: 6, message: 'Bye'}
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() {
        console.log("state is changed")
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    // addPost() {
    //     let newPost = {
    //         id: 5,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 7
    //     };
    
    //     this._state.profilePage.postsData.push(newPost);
    //     this._state.profilePage.newPostText = "";
    //     this._callSubscriber(this._state);
    // },
    // updatePostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state);
    // },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;
