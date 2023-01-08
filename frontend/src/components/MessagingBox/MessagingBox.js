import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from '@styled-icons/boxicons-solid/Send';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';

import './styles.css';

const MessagingBox = () => {
    const dispatch = useDispatch();

    const messageState = useSelector(state => state.messages);

    const [input, setInput] = useState('');

    return (
        <div 
        style={{
            display: 'block', 
            width: 'inherit', 
            height: 'inherit', 
            borderRadius: '12px', 
            backgroundColor: 'black', 
            border: '3px solid rgb(30, 30, 30)'
        }}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Delete
                onClick={() => setInput('')}
                style={{
                    marginRight: '2vw',
                    width: '1.2vw', 
                    cursor: 'pointer'
                }}>
                </Delete>
            </div>

            <input
            id='message-input'
            onChange={e => setInput(e.target.value)}
            value={input}
            style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                letterSpacing: '1px',
                color: 'white',
                backgroundColor: 'rgb(20, 20, 20)',
                width: '74vw',
                height: '10vh',
                border: '2px solid black',
                borderRadius: '6px',
                marginTop: '0.6vh',
                marginBottom: '0.6vh'
            }} 
            className="flex-center">
            </input>

            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Send
                onClick={() => {
                    if (messageState.viewingChannel) dispatch({/* channel message thunk - (input, messageState.currChannelId) */});
                    if (messageState.viewingDm) dispatch({/* dm channel message thunk - (input, messageState.currChannelId) */});
                }}
                style={{
                    marginRight: '2vw',
                    width: '1.2vw', 
                    cursor: 'pointer'
                }}>
                </Send>
            </div>
        </div>
    );
};

export default MessagingBox;