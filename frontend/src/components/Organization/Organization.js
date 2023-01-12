import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import { addUserToOrgThunk, fetchOrgDataThunk } from "../../store/organizationReducer";
import { getUserThunk } from "../../store/sessionReducer.js";

const Organization = ({ orgId, orgName, orgOwnerId, totalUsers, totalChannels, totalDmChannels }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [clicked, setClicked] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);
    const [addedUser, setAddedUser] = useState(false);

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (orgId === user.user_organizations[0].organization_id) dispatch(fetchOrgDataThunk(orgId));
    }, [user.id])

    useEffect(() => {
        if (addedUser === true) dispatch(getUserThunk(user.id));
    }, [addedUser]);

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
            cursor: 'pointer',
            borderTop: '2px solid rgb(30, 30, 30)',
            borderBottom: '2px solid rgb(30, 30, 30)'
        }}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p style={{marginLeft: '0.6vw'}}>{orgName}</p>

                <ExpandMore
                onClick={e => {
                    e.stopPropagation();
                    setClicked(clicked => !clicked);
                
                    if (!clicked) setClickedAddUser(false);
                }}
                style={{
                    display: clicked ? 'none' : 'block',
                    marginTop: '1.4vh',
                    color: 'yellow',
                    height: '4vh',
                    width: '2vw',
                    cursor: 'pointer'
                }}>
                </ExpandMore>

                <ExpandLess
                    onClick={e => {
                        e.stopPropagation();
                        setClicked(clicked => !clicked);
                    
                        if (!clicked) setClickedAddUser(false);
                    }}
                    style={{
                        display: clicked ? 'block' : 'none',
                        marginTop: '1.4vh',
                        color: 'yellow',
                        height: '4vh',
                        width: '2vw',
                        cursor: 'pointer'
                    }}>
                </ExpandLess>
            </div>

            <div style={{display: clicked ? 'flex' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4vh'}}>
                {
                    Object.keys(keyMap).map((key, i) => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                                <div style={{textAlign: 'left', width: '10vw', marginBottom: '1vh'}}>{keyMap[key]}:</div>
                                <div style={{textAlign: 'right', width: '2vw'}}>
                                    {
                                        key === 'organization_users' ? totalUsers 
                                        : key === 'organization_channels' ? totalChannels 
                                        : key === 'organization_dmMessage_channels' && totalDmChannels
                                    }
                                </div>
                            </div>
                        )
                    })
                }

                <div
                className="buzz-btn"
                onClick={e => {
                    e.stopPropagation();

                    setClickedAddUser(clicked => !clicked);
                    setAddedUser(false);
                }}
                style={{
                    display: (orgOwnerId === user.id) && !clickedAddUser ? 'block' : 'none',
                    marginTop: '4vh',
                    marginBottom: '2vh',
                    lineHeight: '4vh',
                    borderRadius: '8px',
                    width: '12vw',
                    height: '4vh'
                }}>
                    Add Users
                </div>

                <div style={{display: clickedAddUser ? 'block' : 'none', marginTop: '4vh', marginBottom: '2vh'}}>
                    <p style={{display: error ? 'block' : 'none', borderTop: '2px solid yellow', borderBottom: '2px solid yellow', padding: '1vh', marginTop: '-0.5vh'}}>Please enter a valid email</p>

                    <div style={{display: 'flex'}}>
                        <input
                        id='search-input'
                        autoComplete='off'
                        placeHolder={`User email...`}
                        onChange={e => setInput(e.target.value)}
                        value={input}
                        className='flex-center'
                        style={{
                            fontFamily: 'Roboto',
                            fontSize: '14px',
                            letterSpacing: '1px',
                            color: 'white',
                            backgroundColor: 'rgb(20, 20, 20)',
                            width: '14vw',
                            height: '4vh',
                            border: '2px solid rgb(30, 30, 30)',
                            borderRadius: '8px'
                        }}>
                        </input>

                        <div
                        className="buzz-btn"
                        onClick={() => {
                            if (!validateEmail(input)) setError(true);
                            if (validateEmail(input)) {
                                setError(false);
                                setClickedAddUser(false);

                                dispatch(addUserToOrgThunk(orgId, input));

                                setAddedUser(true);
                                setInput('');
                            };
                        }}
                        style={{width: '3vw', height: '3vh', marginLeft: '0.5vw', marginTop: '0.2vh', lineHeight: '3.5vh'}}>
                            Add
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organization;