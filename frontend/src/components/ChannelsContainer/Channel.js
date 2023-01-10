import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateCurrMessages, setViewingChannel } from '../../store/messagesReducer.js';

import ChannelSearch from "./ChannelSearch.js";

const Channel = ({ channelId, channelName, ownerId, messages, totalUsers }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);

    const [clickedExpand, setClickedExpand] = useState(false);
    const [clickedAddUser, setClickedAddUser] = useState(false);

    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return (
        <div 
        onClick={() => {
            dispatch(setViewingChannel(channelId));
            dispatch(populateCurrMessages(messages));
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '14vw',
                textAlign: 'center',
                fontSize: '16px',
                marginTop: '1vh',
                padding: '0.8vh',
                cursor: 'pointer',
                borderTop: '2px solid rgb(30, 30, 30)',
                borderBottom: !clickedExpand && '2px solid rgb(30, 30, 30)'
            }} 
            className={messageState.currChannelId === channelId && 'selected'}>
                # {channelName}
                <button
                    onClick={e => {
                        e.stopPropagation();
                        setClickedExpand(clicked => !clicked);

                        setClickedAddUser(false);
                    }}
                    style={{
                        marginLeft: '6vw',
                        width: '2vw',
                        height: '2.5vh',
                        backgroundColor: 'yellow',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                    className={clickedExpand ? 'collapse-btn' : 'expand-btn'}>
                </button>
            </div>

            <div style={{ display: clickedExpand ? 'block' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4vh', maxWidth: '14vw'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '14vw',}}>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>Total Users:</div>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>{totalUsers}</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '14vw'}}>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>Total Messages:</div>
                    <div style={{ textAlign: 'left', marginBottom: '1vh' }}>{messages.length}</div>
                </div>

                <div
                onClick={e => {
                    e.stopPropagation();
                    setClickedAddUser(clicked => !clicked);
                }}
                style={{
                    display: (ownerId === user.id) && !clickedAddUser ? 'block' : 'none',
                    textAlign: 'center',
                    marginTop: '4vh',
                    backgroundColor: 'yellow',
                    color: 'black',
                    padding: '0.5vw',
                    borderRadius: '8px',
                    cursor: 'pointer'
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

{/* <p style={{ display: error ? 'block' : 'none', borderTop: '2px solid yellow', borderBottom: '2px solid yellow', padding: '1vh', marginTop: '-0.5vh' }}>Please enter a valid email</p>

                    <div style={{ display: 'flex' }}>
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
                                borderRadius: '8px'
                            }}>
                        </input>

                        <div
                        onClick={() => {
                            if (!validateEmail(input)) setError(true);
                            if (validateEmail(input)) {
                                setError(false);
                                setClickedAddUser(false);
                                // dispatch(addUserToChannelThunk(channelId, input));
                                setInput('');
                            };
                        }}
                        style={{
                            backgroundColor: 'yellow',
                            color: 'black',
                            padding: '0.4vw',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}>
                            Add
                        </div>
                    </div> */}

export default Channel;