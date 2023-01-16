import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { populateCurrMessages, setViewingChannel, clearChannelMessageData } from '../../store/messagesReducer.js';
import { deleteChannelThunk, fetchOrgDataThunk, editChannelThunk, clearChannel } from "../../store/organizationReducer.js";

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import ChannelSearch from "./ChannelSearch.js";
import ChannelUsersContainer from "./ChannelUsersContainer.js";

const Channel = ({ channelId, channelName, ownerId, messages, totalUsers, usersArr }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);
    const currOrg = useSelector(state => state.organization);

    const [clickedExpand, setClickedExpand] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);
    const [clickedViewUsers, setClickedViewUsers] = useState(false);
    
    const [clickedEdit, setClickedEdit] = useState(false);
    const [input, setInput] = useState(channelName);

    return (
        <div 
        className="flex-center"
        onClick={async () => {
            await dispatch(setViewingChannel(channelId));
            await dispatch(fetchOrgDataThunk(currOrg.id));
            await dispatch(populateCurrMessages(messages));
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '16vw',
                height: '6vh',
                textAlign: 'center',
                fontSize: '16px',
                marginTop: '1vh',
                marginBottom: '1vh',
                padding: '0.8vh',
                cursor: 'pointer',
                borderTop: '2px solid rgb(30, 30, 30)',
                borderBottom: !clickedExpand && '2px solid rgb(30, 30, 30)'
            }} 
            className={messageState.currChannelId === channelId && 'selected'}>
                <p style={{maxWidth: '8vw'}}>{`#${channelName}`}</p>

                <ExpandMore
                    onClick={e => {
                        e.stopPropagation();
                        setClickedExpand(clicked => !clicked);

                        setClickedAddUser(false);
                    }}
                    style={{
                        display: clickedExpand ? 'none' : 'block',
                        marginTop: '1.5vh',
                        color: 'yellow',
                        height: '4vh',
                        cursor: 'pointer'
                    }}>
                </ExpandMore>

                <ExpandLess
                    onClick={e => {
                        e.stopPropagation();
                        setClickedExpand(clicked => !clicked);

                        setClickedAddUser(false);
                    }}
                    style={{
                        display: clickedExpand ? 'block' : 'none',
                        marginTop: '1.5vh',
                        color: 'yellow',
                        height: '4vh',
                        cursor: 'pointer'
                    }}>
                </ExpandLess>
            </div>

            <div style={{display: clickedExpand ? 'flex' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2vh', borderBottom: '2px solid rgb(30, 30, 30)'}}>
                <div style={{display: user.id === ownerId ? 'flex' : 'none', justifyContent: 'space-between', marginTop: '-1vh', marginBottom: '4vh'}}>
                    <div 
                    className="buzz-btn" 
                    onClick={async () => {
                        if (clickedEdit === true) {
                            await dispatch(editChannelThunk(channelId, input));
                            await dispatch(fetchOrgDataThunk(currOrg.id));

                            setClickedEdit(false);
                            return;
                        };

                        setClickedEdit(true);
                    }}
                    style={{width: '6vw', marginRight: '1.5vw'}}>
                        {!clickedEdit ? 'Edit' : 'Save'}
                    </div>

                    <div 
                    className="buzz-btn" 
                    onClick={() => {
                        dispatch(deleteChannelThunk(channelId));
                        dispatch(clearChannel(channelId));
                        dispatch(clearChannelMessageData());
                    }}
                    style={{width: '6vw', marginLeft: '1.5vw'}}>
                        Delete
                    </div>
                </div>

                <div style={{display: clickedEdit ? 'block' : 'none'}}>
                    <input
                    id='search-input'
                    autoComplete='off'
                    onChange={e => setInput(e.target.value)}
                    value={input}
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
                </div>

                <div className={messageState.currChannelId === channelId && 'selected'} style={{ display: 'flex', justifyContent: 'space-between', width: '14vw'}}>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>Total Messages:</div>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>{messages.length}</div>
                </div>

                <div 
                className="buzz-btn" 
                onClick={() => setClickedViewUsers(clicked => !clicked)}
                style={{
                    display: (totalUsers - 1 > 0) ? 'block' : 'none', 
                    height: '3.5vh', 
                    marginTop: '2vh', 
                    marginBottom: '2vh',
                    lineHeight: '3.6vh',
                    width: '14vw'
                }}>
                    View All {totalUsers - 1} Users
                </div>

                <div
                style={{display: clickedViewUsers ? 'block' : 'none'}}>
                    <ChannelUsersContainer channelId={channelId} ownerId={ownerId} users={usersArr} />
                </div>

                <div
                className="buzz-btn"
                onClick={e => {
                    e.stopPropagation();
                    setClickedAddUser(clicked => !clicked);
                }}
                style={{
                    display: (ownerId === user.id) && !clickedAddUser ? 'block' : 'none',
                    marginTop: '2vh',
                    marginBottom: '2vh',
                    lineHeight: '4vh',
                    width: '14vw'
                }}>
                    Add Users
                </div>

                <div style={{ display: clickedAddUser ? 'block' : 'none', marginTop: '4vh' }}>
                    <ChannelSearch users={usersArr.map((user) => user.username)} />
                </div>
            </div>
        </div>
    );
};

export default Channel;