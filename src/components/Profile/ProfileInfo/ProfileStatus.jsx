import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component  {

    state = {
        editMode: false,
        status: this.props.status
    }

    handleActivateEditMode = () => {
        this.setState({ editMode: true });
    }

    handleDeactivateEditMode = () => {
        this.setState({ 
            editMode: false 
        });
        this.props.updateStatus(this.state.status);
    }

    handleStatusChange = (e) => {
        let status = e.currentTarget.value;
        this.setState({status});
    }

    render(){
        return (
            <div>
                { !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.handleActivateEditMode}>{this.props.status || "----"}</span>
                    </div>
                }
                { this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.handleDeactivateEditMode} 
                        value={this.state.status} onChange={this.handleStatusChange}/>
                    </div>
                }
            </div>
        );
    }
    
};

export default ProfileStatus;