import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addUserToOrgThunk, fetchOrgDataThunk } from "../../store/organizationReducer";

const Organization = ({ orgId, orgName, orgOwnerId }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [orgUsers, setOrgUsers] = useState(0);

    const [clicked, setClicked] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (orgId === user.user_organizations[0].organization_id) {
            dispatch(fetchOrgDataThunk(orgId));

            if (currOrg.organization_users) setOrgUsers(currOrg.organization_users.length);
        };
    }, [user.id])

    useEffect(() => {
        if (currOrg.organization_users && currOrg.organization_users.length > orgUsers) {
            dispatch(fetchOrgDataThunk(orgId));
            setOrgUsers(currOrg.organization_users.length);
        };
    }, [currOrg.organization_users]);

    const keyMap = {
        organization_users: 'Users',
        organization_channels: 'Channels',
        organization_dmMessage_channels: 'Direct Messages'
    };

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (!currOrg.organization_users) return <div className="flex-center">Loading...</div>

    return (
        <div
        onClick={() => dispatch(fetchOrgDataThunk(orgId))}
        className={(currOrg && currOrg.id) && (currOrg.id === orgId) && 'selected'}
        style={{

            textAlign: 'center',
            fontSize: '16px',
            marginTop: '1vh',
            padding: '0.8vh',
            cursor: 'pointer',
            borderTop: '2px solid rgb(30, 30, 30)',
            borderBottom: '2px solid rgb(30, 30, 30)'
        }}>
            {orgName}

            <button 
            onClick={e => {
                e.stopPropagation();
                setClicked(clicked => !clicked);

                if (!clicked) setClickedAddUser(false);
            }}
            style={{
                marginLeft: '6vw',
                width: '2vw', 
                height: '2.5vh',
                backgroundColor: 'yellow',
                borderRadius: '6px',
                cursor: 'pointer'
            }} 
            className={clicked ? 'collapse-btn' : 'expand-btn'}>
            </button>

            <div style={{display: clicked ? 'flex' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4vh'}}>
                {
                    Object.keys(keyMap).map((key, i) => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                                <div style={{textAlign: 'left', width: '10vw', marginBottom: '1vh'}}>{keyMap[key]}:</div>
                                <div style={{textAlign: 'right', width: '2vw'}}>{key !== 'organization_users' ? currOrg[key].length : orgUsers}</div>
                            </div>
                        )
                    })
                }

                <div
                onClick={e => {
                    e.stopPropagation();
                    setClickedAddUser(clicked => !clicked);
                }}
                style={{
                    display: (orgOwnerId === user.id) && !clickedAddUser ? 'block' : 'none',
                    marginTop: '4vh',
                    backgroundColor: 'yellow',
                    color: 'black',
                    padding: '0.5vw',
                    borderRadius: '8px'
                }}>
                    Add Users
                </div>

                <div style={{display: clickedAddUser ? 'block' : 'none', marginTop: '4vh'}}>
                    <p style={{display: error ? 'block' : 'none', borderTop: '2px solid yellow', borderBottom: '2px solid yellow', padding: '1vh', marginTop: '-0.5vh'}}>Please enter a valid email</p>

                    <div style={{display: 'flex'}}>
                        <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        style={{
                            fontFamily: 'Roboto',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginRight: '1vw',
                            color: 'black',
                            backgroundColor: 'yellow',
                            border: '1px solid black',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                        </input>

                        <div
                        onClick={() => {
                            if (!validateEmail(input)) setError(true);
                            if (validateEmail(input)) {
                                setError(false);
                                setClickedAddUser(false);

                                dispatch(addUserToOrgThunk(orgId, input));

                                setInput('');
                            };
                        }}
                        style={{
                            backgroundColor: 'yellow',
                            color: 'black',
                            padding: '0.4vw',
                            borderRadius: '6px'
                        }}>
                            Add
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organization;