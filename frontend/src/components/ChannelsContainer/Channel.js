import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateCurrMessages, setViewingChannel } from '../../store/messagesReducer.js';

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import ChannelSearch from "./ChannelSearch.js";
import ChannelUsersContainer from "./ChannelUsersContainer.js";

const Channel = ({ channelId, channelName, ownerId, messages, totalUsers, usersArr }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);

    const [clickedExpand, setClickedExpand] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);
    const [clickedViewUsers, setClickedViewUsers] = useState(false);

    return (
        <div 
        className="flex-center"
        onClick={() => {
            dispatch(setViewingChannel(channelId));
            dispatch(populateCurrMessages(messages));
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '16vw',
                textAlign: 'center',
                fontSize: '16px',
                marginTop: '1vh',
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

            <div style={{ display: clickedExpand ? 'block' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4vh', marginBottom: '2vh', borderBottom: '2px solid rgb(30, 30, 30)', maxWidth: '14vw'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '14vw'}}>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>Total Messages:</div>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>{messages.length}</div>
                </div>

                <div 
                className="buzz-btn" 
                onClick={() => setClickedViewUsers(clicked => !clicked)}
                style={{display: (totalUsers - 1 > 0) ? 'block' : 'none', height: '3.5vh', marginTop: '2vh', lineHeight: '3.6vh'}}>
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
                    lineHeight: '4vh'
                }}>
                    Add Users
                </div>

                <div style={{ display: clickedAddUser ? 'block' : 'none', marginTop: '4vh' }}>
                    <ChannelSearch />
                </div>
            </div>
        </div>
    );
};

export default Channel;