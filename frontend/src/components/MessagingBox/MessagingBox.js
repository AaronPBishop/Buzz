import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from '@styled-icons/boxicons-solid/Send';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
import { Bold } from '@styled-icons/boxicons-regular/Bold';
import { Italic } from '@styled-icons/boxicons-regular/Italic';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';

import { createDmMessageThunk, createChannelMessageThunk, clearMessageImgs } from '../../store/messagesReducer.js';

import AddImages from './AddImages.js';

import './styles.css';

const MessagingBox = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);
    const images = useSelector(state => state.messages.imagesToAdd);

    const [input, setInput] = useState('');

    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [clickedAddImg, setClickedAddImg] = useState(false);

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            if (messageState.viewingChannel) {
                dispatch(createChannelMessageThunk(user.id, messageState.currChannelId, input, images));

                setInput('');
                dispatch(clearMessageImgs());
            };
            if (messageState.viewingDm) {
                dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input, images));

                setInput('');
                dispatch(clearMessageImgs());
            };
        };
    };

    return (
        <div
            style={{
                display: 'block',
                width: '76.1vw',
                marginLeft: '0.6vw',
                height: 'inherit',
                borderRadius: '12px',
                backgroundColor: 'rgb(20, 20, 20)',
                border: '2px solid transparent',
                boxShadow: '0px 0px 4px yellow'
            }}>
            <div style={{display: 'flex', justifyContent: 'flex-start', width: !clickedAddImg ? 'inherit' : '10vw', height: '2.4vh', padding: '2px' }}>
                <div
                className='buzz-btn'
                onClick={() => setClickedAddImg(false)}
                style={{display: clickedAddImg ? 'block' : 'none', height: '2.5vh', width: '3vw', marginLeft: '0.5vw'}}>
                    Back
                </div>

                <Bold
                    onClick={() => setBold(bold => !bold)}
                    style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: bold && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '1vw', cursor: 'pointer' }}>
                </Bold>

                <Italic
                    onClick={() => setItalic(italic => !italic)}
                    style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: italic && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '0.5vw', cursor: 'pointer' }}>
                </Italic>

               <ImageAdd
                onClick={() => setClickedAddImg(true)}
                style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: italic && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '0.5vw', cursor: 'pointer' }}>

                </ImageAdd> {images.length === 0 ? (
                    <p></p>
                ) : (
                    images.length > 0 && (
                        <p style={{marginLeft: '0.5vw',fontSize: '11px', color: 'yellow', fontWeight: 'bold', fontStyle: 'italic'}}> img total = {images.length}</p>
                    )
                )}


            </div>

            {
                clickedAddImg === false ?
                <div>
                    <input
                    id='message-input'
                    onKeyDown={handleKeyDown}
                    autoComplete='off'
                    placeholder='Send a message...'
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

                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '2.4vh', padding: '2px' }}>
                        <Delete
                            onClick={() => setInput('')}
                            style={{ marginLeft: '1vw', cursor: 'pointer' }}>
                        </Delete>

                        <Send
                            onClick={() => {
                                if (messageState.viewingChannel) {
                                    dispatch(createChannelMessageThunk(user.id, messageState.currChannelId, input, images));

                                    setInput('');
                                    dispatch(clearMessageImgs());
                                };
                                if (messageState.viewingDm) {
                                    dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input, images));

                                    setInput('');
                                    dispatch(clearMessageImgs());
                                };
                            }}
                            style={{ marginRight: '1vw', cursor: 'pointer' }}>
                        </Send>
                    </div>
                </div>
                :
                <AddImages />
            }
        </div>
    );
};

export default MessagingBox;
