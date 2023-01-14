import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import { addUserToOrgThunk, fetchOrgDataThunk, deleteOrgThunk, editOrgThunk } from "../../store/organizationReducer";
import { getUserThunk, setDeletedOrg } from "../../store/sessionReducer.js";

import OrgUsersContainer from "./OrgUsersContainer.js";

const Organization = ({ orgId, orgName, orgOwnerId, totalUsers, totalChannels, totalDmChannels, usersArr }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [clicked, setClicked] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);
    const [clickedViewUsers, setClickedViewUsers] = useState(false);
    const [addedUser, setAddedUser] = useState(false);

    const [clickedEdit, setClickedEdit] = useState(false);
    const [clickedSave, setClickedSave] = useState(false);
    const [editNameInput, setEditNameInput] = useState(orgName);
    const [editImgInput, setEditImgInput] = useState('');

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (orgId === user.user_organizations[0].organization_id) dispatch(fetchOrgDataThunk(orgId));
    }, [dispatch, orgId, user.id, user.user_organizations])

    useEffect(() => {
        if (addedUser === true) dispatch(getUserThunk(user.id));
    }, [dispatch, addedUser, user.id]);

    useEffect(() => {
        if (clickedSave === true) {
            dispatch(getUserThunk(user.id));

            setClickedSave(false);
        };
    }, [dispatch, clickedSave, user.id]);

    const keyMap = {
        organization_channels: 'Channels',
        organization_dmMessage_channels: 'Direct Messages'
    };


    const handleKeyDown = e => {
        if (e.key === "Enter") {
            if (!validateEmail(input)) {setError(true)}
            if (validateEmail(input)) {
                setError(false);
                setClickedAddUser(false);

                dispatch(addUserToOrgThunk(orgId, input));

                setAddedUser(true);
                setInput('');
            };
    }}

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

            <div style={{display: clicked ? 'flex' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2vh'}}>
                <div style={{display: user.id === orgOwnerId ? 'flex' : 'none', marginTop: '-1vh', marginBottom: '4vh'}}>
                    <div
                    className="buzz-btn"
                    onClick={() => {
                        if (clickedEdit === true) {
                            dispatch(editOrgThunk(orgId, editNameInput, editImgInput));

                            setClickedEdit(false);
                            setClickedSave(true);

                            return;
                        };

                        setClickedEdit(true);
                    }}
                    style={{width: '6vw', marginRight: '1.4vw'}}>
                        {!clickedEdit ? 'Edit' : 'Save'}
                    </div>

                    <div
                    className="buzz-btn"
                    onClick={() => {
                        dispatch(deleteOrgThunk(orgId));

                        dispatch(setDeletedOrg(true));
                    }}
                    style={{width: '6vw', marginLeft: '1.4vw'}}>
                        Delete
                    </div>
                </div>

                <div style={{display: clickedEdit ? 'block' : 'none'}}>
                    <input
                    id='search-input'
                    autoComplete='off'
                    onChange={e => setEditNameInput(e.target.value)}
                    value={editNameInput}
                    className='flex-center'
                    style={{
                        textAlign: 'center',
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        letterSpacing: '1px',
                        color: 'white',
                        backgroundColor: 'rgb(20, 20, 20)',
                        width: '14vw',
                        height: '4vh',
                        border: '2px solid rgb(30, 30, 30)',
                        borderRadius: '8px',
                        marginTop: '-2vh',
                        marginBottom: '4vh'
                    }}>
                    </input>

                    <input
                    id='search-input'
                    autoComplete='off'
                    onChange={e => setEditImgInput(e.target.value)}
                    placeholder='Organization Image (URL)'
                    value={editImgInput}
                    className='flex-center'
                    style={{
                        fontFamily: 'Roboto',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        letterSpacing: '1px',
                        color: 'white',
                        backgroundColor: 'rgb(20, 20, 20)',
                        width: '14vw',
                        height: '4vh',
                        border: '2px solid rgb(30, 30, 30)',
                        borderRadius: '8px',
                        marginTop: '-2vh',
                        marginBottom: '4vh'
                    }}>
                    </input>
                </div>

                {
                    Object.keys(keyMap).map((key, i) => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                                <div style={{textAlign: 'left', width: '10vw', marginBottom: '1vh'}}>{keyMap[key]}:</div>
                                <div style={{textAlign: 'right', width: '2vw'}}>
                                    {
                                        key === 'organization_channels' ? totalChannels
                                        : key === 'organization_dmMessage_channels' && totalDmChannels
                                    }
                                </div>
                            </div>
                        )
                    })
                }

                <div
                className="buzz-btn"
                onClick={() => setClickedViewUsers(clicked => !clicked)}
                style={{display: (totalUsers - 1 > 0) ? 'block' : 'none', height: '3.5vh', width: '14vw', marginTop: '2vh', marginBottom: '2vh', lineHeight: '3.6vh'}}>
                    View All {totalUsers - 1} Users
                </div>

                <div
                style={{display: clickedViewUsers ? 'block' : 'none'}}>
                    <OrgUsersContainer orgId={orgId} ownerId={orgOwnerId} users={usersArr} />
                </div>

                <div
                className="buzz-btn"
                onClick={e => {
                    e.stopPropagation();

                    setClickedAddUser(clicked => !clicked);
                    setAddedUser(false);
                }}
                style={{
                    display: (orgOwnerId === user.id) && !clickedAddUser ? 'block' : 'none',
                    marginTop: (totalUsers - 1 <= 0) ? '2vh' : '0vh',
                    marginBottom: '2vh',
                    lineHeight: '4vh',
                    borderRadius: '8px',
                    width: '14vw',
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
                        onKeyDown={handleKeyDown}
                        placeholder={`User email...`}
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
