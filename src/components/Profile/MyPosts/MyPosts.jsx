import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthThunkCreator, minLengthThunkCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthThunkCreator(10);
const minLength10 = minLengthThunkCreator(1);

let MyPosts = React.memo(props => {

		let postsElement = props.posts
			.map((p, index) => <Post key={index} message={p.message} likesCount={p.likesCount}/>)
		
		// let newPostElement = React.createRef();

		// let onAddPost = () => {
		// 	props.addPost();
		// }

		// let onPostChange = () => {
		// 	let acceptingPostMessage = newPostElement.current.value;
		// 	props.updatePostText(acceptingPostMessage);
		// }

		let addNewPost = (values) => {
			props.addPost(values.newPostText);
		}

		return (
			<div className={s.postsBlock}>
				<h3>My posts</h3>
				<AddNewPostFormRedux onSubmit={addNewPost}/>
				<div className={s.posts}>
					{postsElement}
				</div>
			</div>
		);
})

const AddNewPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field 
				component={Textarea} 
				name="newPostText" 
				placeholder="Enter your text"
				validate={[required, maxLength10, minLength10]}
				>
			</Field>
			<div>
				<button>Add post</button>
			</div>
		</form>
		
	)
}

const AddNewPostFormRedux = reduxForm({form: "postAddTextForm"}) (AddNewPostForm)

export default MyPosts;
