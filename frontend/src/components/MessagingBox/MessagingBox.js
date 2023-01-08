import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from '@styled-icons/boxicons-solid/Send';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
import { TextBold } from '@styled-icons/fluentui-system-filled/TextBold';
import { Italic } from '@styled-icons/boxicons-regular/Italic';

import { createDmMessageThunk } from '../../store/messagesReducer.js';

import './styles.css';

const MessagingBox = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);

    const [input, setInput] = useState('');
    
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            // if (messageState.viewingChannel) dispatch();
            if (messageState.viewingDm) {
                dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input));

                setInput('');
            };
        };
    };

    return (
        <div 
        style={{
            display: 'block', 
            width: 'inherit', 
            height: 'inherit', 
            borderRadius: '12px', 
            backgroundColor: 'rgb(20, 20, 20)', 
            border: '3px solid rgb(30, 30, 30)'
        }}>
            <div style={{display: 'flex', justifyContent: 'flex-start', height: '2.4vh', padding: '2px'}}>
                <TextBold 
                onClick={() => setBold(bold => !bold)}
                style={{backgroundColor: bold && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '1vw', cursor: 'pointer'}}>
                </TextBold>

                <Italic 
                onClick={() => setItalic(italic => !italic)}
                style={{backgroundColor: italic && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '0.5vw', cursor: 'pointer'}}>
                </Italic>
            </div>

            <input
            id='message-input'
            onKeyDown={handleKeyDown}
            autoComplete='off'
            placeHolder='Send a message...'
            onChange={e => setInput(e.target.value)}
            value={input}
            style={{
                fontFamily: 'Roboto',
                fontSize: '18px',
                fontWeight: bold && 'bold',
                fontStyle: italic && 'italic',
                letterSpacing: '1px',
                color: 'white',
                backgroundColor: 'rgb(16, 16, 16)',
                width: '75vw',
                height: '11.5vh',
                border: '2px solid transparent',
                borderRadius: '8px'
            }} 
            className="flex-center">
            </input>

            <div style={{display: 'flex', justifyContent: 'space-between', height: '2.4vh', padding: '2px'}}>
                <Delete
                onClick={() => setInput('')}
                style={{marginLeft: '1vw', cursor: 'pointer'}}>
                </Delete>

                <Send
                onClick={() => {
                    // if (messageState.viewingChannel) dispatch();
                    if (messageState.viewingDm) {
                        dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input));

                        setInput('');
                    };
                }}
                style={{marginRight: '1vw', cursor: 'pointer'}}>
                </Send>
            </div>
        </div>
    );
};

export default MessagingBox;