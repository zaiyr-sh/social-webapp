// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = { 
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
    // newMessageBody: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        // case UPDATE_NEW_MESSAGE_BODY:
        //     return {
        //         ...state,
        //         newMessageBody: action.body
        //     };
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                // newMessageBody: "",// уже используется
                messagesData: [...state.messagesData, {id: 7, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })
// export const updateNewMessageBodyActionCreator = (acceptingNewMessage) => 
//     ({ type: UPDATE_NEW_MESSAGE_BODY, body: acceptingNewMessage })

export default dialogsReducer;