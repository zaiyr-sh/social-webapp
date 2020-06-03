import React from 'react';
import { Redirect } from 'react-router-dom';

import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogsData
        .map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messageElements = state.messagesData
        .map(m => <Message message={m.message} key={m.id}/>)

    let newMessageBody = state.newMessageBody;
    let sendMessageClick = () => {
        props.sendMessage();
    }
    let onNewMessageChange = (event) => {
        let body = event.target.value;
        props.updateNewMessageBody(body);
    }

    if(!props.isAuth) return <Redirect to={'/login'}/>;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <div>
                    <div><textarea 
                        value = {newMessageBody}
                        onChange = {onNewMessageChange} 
                        placeholder="Enter your message"
                    ></textarea></div>
                    <div><button onClick={sendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;