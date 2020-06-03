import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component  {

    state = {
        editMode: false
    }

    handleActivateEditMode(){
        this.setState({ editMode: true })
    }

    handleDeactivateEditMode(){
        this.setState({ editMode: false })
    }

    render(){
        debugger
        return (
            <div>
                { !this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.handleActivateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }
                { this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.handleDeactivateEditMode.bind(this)} value={this.props.status}/>
                    </div>
                }
            </div>
        );
    }
    
};

export default ProfileStatus;