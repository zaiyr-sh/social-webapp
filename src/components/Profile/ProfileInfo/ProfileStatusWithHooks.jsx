import React, { useState , useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {

    // let stateWithSetState = useState(false);
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    // let editMode = stateWithSetState[0];
    // let setEditMode = stateWithSetState[1];

    const handleActivateEditMode = () => {
        setEditMode(true);
    }

    const handleDeactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const handleStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

        return (
            <div>
                { !editMode &&
                    <div>
                        <span onDoubleClick={handleActivateEditMode}>{props.status || "----"}</span>
                    </div>
                }
                { editMode &&
                    <div>
                        <input 
                            autoFocus={true} 
                            onBlur={handleDeactivateEditMode} 
                            onChange={handleStatusChange}  
                            value={status}
                        />
                    </div>
                }
            </div>
        );
    }

export default ProfileStatusWithHooks;