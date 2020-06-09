import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Textarea } from '../common/FormsControls/FormsControls';
import { required, maxLengthThunkCreator } from '../../utils/validators/validators';

const maxLength50 = maxLengthThunkCreator(50);

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogsData
        .map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>);
    let messageElements = state.messagesData
        .map(m => <Message message={m.message} key={m.id}/>)

    // let newMessageBody = state.newMessageBody;

    // let onNewMessageChange = (event) => {
    //     let body = event.target.value;
    //     props.updateNewMessageBody(body);
    // }

    // let sendMessageClick = () => {
    //     props.sendMessage();
    // }

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if(!props.isAuth) return <Redirect to={'/login'}/>;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <Field 
                    component={Textarea} 
                    name="newMessageBody" 
                    placeholder="Enter your message"
                    validate={[required, maxLength50]}
                />
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"}) (AddMessageForm)

export default Dialogs;