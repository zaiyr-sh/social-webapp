import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';
import { setUserProfileActionCreator, getUserProfileThunkCreator } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = 2;
        // usersAPI.getProfile(userId)
        //     .then(response => {
        //         this.props.setUsersProfile(response.data);
        //     });
        this.props.getUserProfileThunk(userId);
    }

    render() {
        return (
            <div>
               <Profile {...this.props} profile={this.props.profile} />
            </div>
        );
    }
};


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer) 

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
}) // () --> объект со свойством , {} --> тело функции

let mapDispatchToProps = (dispatch) => {
    return {
        // setUsersProfile: (profile) => {
        //     dispatch(setUserProfileActionCreator(profile))
        // }
        getUserProfileThunk: (userId) => {
            dispatch(getUserProfileThunkCreator(userId))
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