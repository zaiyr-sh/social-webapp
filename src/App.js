import React from 'react';
import {Route, withRouter } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeAppThunkCreator } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends React.Component {

	componentDidMount(){
		this.props.initializeAppThunk();
	}

	render() {
		if (!this.props.initializing) return <Preloader />
		return (
			<div>
					<div className="app-wrapper">
						<HeaderContainer />
						<Navbar />	
						<div className="app-wrapper-content">
							<Route path="/dialogs" render={() => < DialogsContainer />}/>
							<Route path="/profile/:userId?" render={() => < ProfileContainer />}/>
							<Route path="/users" render={() => <UsersContainer />}/>
							<Route path="/login" render={() => <Login />}/>
						</div>
					</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	initializing: state.app.initializing
});

let mapDispatchToProps = (dispatch) => {
	return {
		initializeAppThunk: () => {
			dispatch(initializeAppThunkCreator())
		}
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps))
	(App);
