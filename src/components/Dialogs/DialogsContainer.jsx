import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
// import StoreContext from '../../StoreContext';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// const DialogsContainer = (props) => {
// 	return (
// 		<StoreContext.Consumer> 
//             { (store) => {
//                 let sendMessage = () => {
//                     store.dispatch(sendMessageActionCreator()); // диспатчим то, что вернул ActionCreator
//                 };
//                 let onNewMessageChange = (body) => {
//                     store.dispatch(updateNewMessageBodyActionCreator(body));
//                 };
//                 return <Dialogs 
//                     updateNewMessageBody={onNewMessageChange} 
//                     sendMessage={sendMessage} 
//                     dialogsPage={store.getState().dialogsPage} />
//             }
//         }
//         </StoreContext.Consumer>
// 	);
// };

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator()); // диспатчим то, что вернул ActionCreator
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyActionCreator(body)); // диспатчим то, что вернул ActionCreator
        }
    }
}

 


// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
