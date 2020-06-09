import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserDataActionCreator, getAuthUserDataThunkCreator, logoutThunkCreator } from '../../redux/auth-reducer';
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
	// componentDidMount(){
	// 	this.props.getAuthUserDataThunk();
	// }

	render(){
		return <Header {...this.props}/>
	}
	
};

let mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login
});

let mapDispatchToProps = (dispatch) => {
	return {
		// setAuthUserData: (id, email, login) => {
		// 	dispatch(setAuthUserDataActionCreator(id, email, login))
		// },
		
		// getAuthUserDataThunk: () => {
		// 	dispatch(getAuthUserDataThunkCreator())
		// },
		logoutThunk: () => {
			dispatch(logoutThunkCreator())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
