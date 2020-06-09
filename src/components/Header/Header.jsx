import React from 'react';
import {NavLink} from 'react-router-dom';

import s from './Header.module.css';

const Header = (props) => {
	return (
		<header className={s.header}>
			<img
				src="https://www.designevo.com/res/templates/thumb_small/brown-circle-and-chocolate-coffee.png"
				alt="logo"
			/>
			<div className={s.loginBlock}>
				{props.isAuth ? <div>{props.login} - <button onClick={props.logoutThunk}>Logout</button> </div>
				: <NavLink to={'/login'}>Login</NavLink> }
			</div>
		</header>
	);
};

export default Header;
