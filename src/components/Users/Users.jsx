import React from 'react';
import userPhoto from '../../assets/images/userPhoto.jpg';
import styles from './Users.module.css';
import { NavLink } from 'react-router-dom';
import { usersAPI } from '../../api/api';

let Users = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	return (
		<div>
			<div className={styles.userList}>
				{pages.map((p) => {
					return (
						<span
							key={p}
							className={props.currentPage === p ? styles.selectedPage : ''}
							onClick={() => {
								props.onPageChanged(p);
							}}
						>
							{p}
						</span>
					);
				})}
			</div>
			{props.users.map((u) => (
				<div key={u.id}>
					<span>
						<div>
							<NavLink to={'/profile/' + u.id}>
								<img
									src={u.photos.small != null ? u.photos.small : userPhoto}
									alt="Avatar"
									className={styles.userPhoto}
								/>
							</NavLink>
						</div>
						<div>
							{u.followed ? (
								<button
									disabled={props.isFollowingInProgress.some(idFollowing => idFollowing === u.id)}
									onClick={() => {
										// props.toggleIsFollowingInProgress(true, u.id);
										props.unfollow(u.id)
										// usersAPI.deleteUnfollowUser(u.id)
										// 	.then((data) => {
										// 		if (data.resultCode === 0) {
										// 			props.unfollow(u.id);
										// 		}
										// 		props.toggleIsFollowingInProgress(false, u.id);
										// 	});
									}}
								>
									Unfollow
								</button>
							) : (
								<button
									disabled={props.isFollowingInProgress.some(idFollowing => idFollowing === u.id)}
									onClick={() => {
										// props.toggleIsFollowingInProgress(true, u.id);
										props.follow(u.id)
										// usersAPI.postFollowUser(u.id)
										// 	.then((data) => {
										// 		if (data.resultCode === 0) {
										// 			props.follow(u.id);
										// 		}
										// 		props.toggleIsFollowingInProgress(false, u.id);
										// 	});
									}}
								>
									Follow
								</button>
							)}
						</div>
					</span>
					<span>
						<span>
							<div>{u.name}</div>
							<div>{u.status}</div>
						</span>
						<span>
							<div>{'u.location.countryName'}</div>
							<div>{'u.location.cityName'}</div>
						</span>
					</span>
				</div>
			))}
		</div>
	);
};



export default Users;
