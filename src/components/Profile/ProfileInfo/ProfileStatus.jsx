import React from 'react';

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

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
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