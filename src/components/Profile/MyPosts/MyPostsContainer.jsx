import { addPostActionCreator, updatePostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
// import StoreContext from '../../../StoreContext';
import { connect } from 'react-redux';

// const MyPostsContainer = (props) => {
// 	// let state = props.store.getState();

// 	// let addPost = () => {
// 	// 	props.store.dispatch(addPostActionCreator());
// 	// };

// 	// let onPostChange = (acceptingPostMessage) => {
// 	// 	props.store.dispatch(updatePostActionCreator(acceptingPostMessage));
// 	// };

// 	return (
// 		<StoreContext.Consumer> 
// 			{ (store) => { 
// 			let state = store.getState();
// 			let addPost = () => {
// 				store.dispatch(addPostActionCreator());
// 			};
		
// 			let onPostChange = (acceptingPostMessage) => {
// 				store.dispatch(updatePostActionCreator(acceptingPostMessage));
// 			};
// 			return <MyPosts
// 				updatePostText={onPostChange}
// 				addPost={addPost}
// 				posts={state.profilePage.postsData}
// 				newPostText={state.profilePage.newPostText}
// 			/>
// 			}
// 		}	
// 		</StoreContext.Consumer>
// 	);
// };

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.postsData,
		newPostText: state.profilePage.newPostText
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		// updatePostText: (acceptingPostMessage) => {
		// 	dispatch(updatePostActionCreator(acceptingPostMessage));
		// },
		addPost: (newPostText) => {
			dispatch(addPostActionCreator(newPostText))
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
