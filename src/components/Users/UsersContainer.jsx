import React, { Fragment } from  'react';
import { connect } from 'react-redux';

import Users from './Users';
import { followActionCreator, unfollowActionCreator, setUsersActionCreator, setCurrentPageActionCreator, setTotalUsersCountActionCreator, toggleIsFetchingActionCreator, toggleIsFollowingInProgressActionCreator, getUsersThunkCreator, postFollowThunkCreator, deleteUnfollowThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

class UsersContainer extends React.Component {
	componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

	onPageChanged = (pageNumber) => {
        this.props.getUsersThunk(pageNumber, this.props.pageSize);
	};

	render() {
        return <Fragment>
                    {this.props.isFetching ? <Preloader/> : null}
                    <Users totalUsersCount={this.props.totalUsersCount} 
                        pageSize={this.props.pageSize} 
                        currentPage={this.props.currentPage} 
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.postFollowThunk}
                        unfollow={this.props.deleteUnFollowThunk}
                        toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
                        isFollowingInProgress={this.props.isFollowingInProgress}
                    />
                </Fragment>
	}
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // follow: (userID) => {
        //     dispatch(followActionCreator(userID)) // диспатчим результат работы ActionCreator (вызываем)
        // },
        // unfollow: (userID) => {
        //     dispatch(unfollowActionCreator(userID)) // диспатчим результат работы ActionCreator (вызываем)
        // },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        toggleIsFollowingInProgress: (isFollowingInProgress, userId) => {
            dispatch(toggleIsFollowingInProgressActionCreator(isFollowingInProgress, userId))
        },
        getUsersThunk: (currentPage, pageSize) => {
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        },
        postFollowThunk: (userId) => {
            dispatch(postFollowThunkCreator(userId))
        },
        deleteUnFollowThunk: (userId) => {
            dispatch(deleteUnfollowThunkCreator(userId))
        }
    }
}

/**  
 * * Short record of MapDispatchToProps

 {follow: followActionCreator,
 unfollow: unfollowActionCreator,
 setUsers: setUsersActionCreator, 
 setCurrentPage: setCurrentPageActionCreator,
 setTotalUsersCount: setTotalUsersCountActionCreator,
 toggleIsFetching: toggleIsFetchingActionCreator}
*/

// let withRedirect = withAuthRedirect(UsersContainer);

// export default connect(mapStateToProps, mapDispatchToProps)(withRedirect);

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)