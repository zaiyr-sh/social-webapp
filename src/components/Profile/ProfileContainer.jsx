import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';
import { setUserProfileActionCreator, getUserProfileThunkCreator, getUserStatusThunkCreator, updateUserStatusThunkCreator } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if(!userId){
                this.props.history.push("/login")
            }
        }
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUsersProfile(response.data);
        //     });
        this.props.getUserProfileThunk(userId);
        // setTimeout(() => {
            this.props.getUserStatusThunk(userId);
        // }, 1000)
    }

    render() {
        return (
            <div>
               <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateUserStatusThunk}/>
            </div>
        );
    }
};


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer) 

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
}) // () --> объект со свойством , {} --> тело функции

let mapDispatchToProps = (dispatch) => {
    return {
        // setUsersProfile: (profile) => {
        //     dispatch(setUserProfileActionCreator(profile))
        // }
        getUserProfileThunk: (userId) => {
            dispatch(getUserProfileThunkCreator(userId))
        },
        getUserStatusThunk: (userId) => {
            dispatch(getUserStatusThunkCreator(userId))
        },
        updateUserStatusThunk: (status) => {
            dispatch(updateUserStatusThunkCreator(status))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default  connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);