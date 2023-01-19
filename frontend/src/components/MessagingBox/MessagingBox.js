import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from '@styled-icons/boxicons-solid/Send';
import { Delete } from '@styled-icons/fluentui-system-filled/Delete';
// import { Bold } from '@styled-icons/boxicons-regular/Bold';
// import { Italic } from '@styled-icons/boxicons-regular/Italic';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';

import { createDmMessageThunk, createChannelMessageThunk, clearMessageImgs } from '../../store/messagesReducer.js';
import { fetchOrgDataThunk } from '../../store/organizationReducer.js';

import AddImages from './AddImages.js';

import './styles.css';


const MessagingBox = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);
    const images = useSelector(state => state.messages.imagesToAdd);
    const currentOrg = useSelector(state => state.organization)

    const [input, setInput] = useState('');

    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [clickedAddImg, setClickedAddImg] = useState(false);

    const handleKeyDown = async e => {
        if (e.key === 'Enter') {
            if (messageState.viewingChannel && (images.length > 0 || input.length > 0)) {
                await dispatch(createChannelMessageThunk(user.id, messageState.currChannelId, input, images));
                await dispatch(fetchOrgDataThunk(currentOrg.id))

                setInput('');
                dispatch(clearMessageImgs());
            };
            if (messageState.viewingDm &&  (images.length > 0 || input.length > 0)) {
                await dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input, images));
                await dispatch(fetchOrgDataThunk(currentOrg.id))
                setInput('');
                dispatch(clearMessageImgs());
            };
        };
    };

    return (
        <div
            style={{
                display: 'block',
                width: '76.3vw',
                marginTop: '0.9vh',
                marginLeft: '0.5vw',
                height: 'inherit',
                borderRadius: '12px',
                backgroundColor: 'rgb(20, 20, 20)',
                border: '3px solid rgb(30, 30, 30)'
            }}>
            <div style={{display: 'flex', justifyContent: 'flex-start', width: !clickedAddImg ? 'inherit' : '10vw', height: '2.4vh', padding: '2px' }}>
                <div
                className='buzz-btn'
                onClick={() => setClickedAddImg(false)}
                style={{display: clickedAddImg ? 'block' : 'none', height: '2.5vh', minWidth: '4vw', marginLeft: '0.5vw', lineHeight: '2.7vh'}}>
                    Back
                </div>

                {/* <Bold
                    onClick={() => setBold(bold => !bold)}
                    style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: bold && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '1vw', cursor: 'pointer' }}>
                </Bold>

                <Italic
                    onClick={() => setItalic(italic => !italic)}
                    style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: italic && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '0.5vw', cursor: 'pointer' }}>
                </Italic> */}

               <ImageAdd
                onClick={() => setClickedAddImg(true)}
                style={{display: !clickedAddImg ? 'block' : 'none', backgroundColor: italic && 'rgb(60, 60, 60)', borderRadius: '2px', marginLeft: '1vw', cursor: 'pointer' }}>

                </ImageAdd> 
                
                {
                    images.length > 0 &&
                    <div
                    className='buzz-btn' 
                    style={{
                        position: 'relative',
                        bottom: clickedAddImg ? '0vh' : '0.2vh',
                        marginLeft: clickedAddImg ? '9.5vw' : '1.5vw', 
                        fontSize: '12px', 
                        fontStyle: 'italic',
                        minWidth: '6vw',
                        height: clickedAddImg ? '2.5vh' : '2vh',
                        borderBottom: clickedAddImg ? '4px solid rgb(165, 165, 0)' : 'none',
                        borderRadius: clickedAddImg ? '8px' : '4px',
                        lineHeight: clickedAddImg ? '2.7vh' : '2vh',
                        cursor: 'default'
                    }}> 
                        Images: {images.length}
                    </div>
                }

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
                            onClick={async () => {
                                if (messageState.viewingChannel && (images.length > 0 || input.length > 0)) {
                                   await dispatch(createChannelMessageThunk(user.id, messageState.currChannelId, input, images));
                                    await dispatch(fetchOrgDataThunk(currentOrg.id))

                                    setInput('');
                                    dispatch(clearMessageImgs());
                                };
                                if (messageState.viewingDm &&  (images.length > 0 || input.length > 0)) {
                                   await dispatch(createDmMessageThunk(user.id, messageState.currChannelId, input, images));
                                    await dispatch(fetchOrgDataThunk(currentOrg.id))

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
