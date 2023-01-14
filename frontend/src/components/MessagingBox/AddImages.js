import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteForever } from '@styled-icons/material-sharp/DeleteForever';

import { addMessageImg, deleteMessageImg } from '../../store/messagesReducer.js';

const AddImages = () => {
    const dispatch = useDispatch();

    const [input, setInput] = useState('');
    const [clicked, setClicked] = useState(false);

    const currImages = useSelector(state => state.messages.imagesToAdd);

    const handleKeyDown = e => {
        if (e.key === "Enter") {
                dispatch(addMessageImg(input));
                setInput('');

        }
    };

    return (
        <div
        style={{
            display: 'flex',
            marginTop: '1vh',
            height: '13.5vh',
            width: 'inherit'
        }}>
            <div style={{display: 'block', width: '24vw', marginTop: '1vh', marginLeft: '0.5vw', marginRight: '1vw'}}>
                <input
                id='message-input'
                autoComplete='off'
                onKeyDown={handleKeyDown}
                placeholder='Add an Image (URL)'
                onChange={e => setInput(e.target.value)}
                value={input}
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    letterSpacing: '1px',
                    color: 'white',
                    backgroundColor: 'rgb(16, 16, 16)',
                    width: '20vw',
                    height: '4vh',
                    border: '2px solid transparent',
                    borderRadius: '8px'
                }}
                className="flex-center">
                </input>

                <div
                className="buzz-btn"
                onClick={() => {
                    dispatch(addMessageImg(input));

                    setInput('');
                }}
                style={{fontSize: '16px', marginTop: '2vh', height: '4vh', width: '20vw', lineHeight: '4vh'}}>
                    Add
                </div>
            </div>

            <div
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                border: '1px solid rgb(30, 30, 30)',
                borderRadius: '12px',
                width: 'inherit',
                height: '17vh',
                marginTop: '-3.5vh',
                marginRight: '1vw',
                overflowY: 'hidden',
                overflowX: 'auto'
            }}>
                {
                    currImages.length > 0 &&
                    currImages.map((img, i) => {
                        return (
                            <div key={i}>
                                <DeleteForever
                                onClick={() => dispatch(deleteMessageImg(img))}
                                style={{
                                    position: 'relative',
                                    bottom: currImages.length < 4 && '14.2vh',
                                    left: currImages.length < 4 && '2.3vw',
                                    height: '3vh',
                                    marginLeft: '0.8vw',
                                    cursor: 'pointer'
                                }}>
                                </DeleteForever>

                                <img
                                style={{
                                    marginTop: currImages.length < 4 ? '0vh' : '-3vh',
                                    marginLeft: '1vw',
                                    marginRight: '1vw',
                                    minHeight: '16.4vh',
                                    maxHeight: '16.4vh',
                                    minWidth: '10vw',
                                    maxWidth: '10vw',
                                    borderRadius: '6px'
                                }}
                                src={img}>
                                </img>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default AddImages;
