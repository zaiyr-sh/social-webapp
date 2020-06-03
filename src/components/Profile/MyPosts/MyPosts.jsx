import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

	let postsElement = props.posts
		.map(p => <Post message={p.message} likesCount={p.likesCount}/>)
	
	let newPostElement = React.createRef();

	let onAddPost = () => {
		props.addPost();
	}

	let onPostChange = () => {
		let acceptingPostMessage = newPostElement.current.value;
		props.updatePostText(acceptingPostMessage);
	}

	return (
			<div className={s.postsBlock}>
				<h3>My posts</h3>
				<div>
					<textarea 
						ref={newPostElement} 
						value={props.newPostText}
						onChange={onPostChange}
						/>
				</div>
				<div>
					<button onClick={onAddPost}>Add post</button>
				</div>
				<div className={s.posts}>
					{postsElement}
				</div>
			</div>
	);
};

export default MyPosts;
