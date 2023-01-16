import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import OrgContainer from "../Organization/OrgContainer.js";
import DmChannelContainer from "../DmChannels/DmChannelContainer.js";
import MessagingBox from "../MessagingBox/MessagingBox.js";
import MsgContainer from '../Messages/MsgContainer.js';
import SearchBar from "../SearchBar/SearchBar.js";
import ChannelContainer from "../ChannelsContainer/ChannelContainer.js";
import UserProfileCardContainer from "../UserProfile/UserProfileCardContainer.js";
import Logo from "../Logo/Logo.js";

import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

import { clearCurrImgUrl } from "../../store/messagesReducer.js";

const BaseContainer = () => {
    const dispatch = useDispatch();

    const currImgViewing = useSelector(state => state.messages.currImgUrl);

    useEffect(() => {
        const htmlElement = document.querySelector("html");
        htmlElement.style.backgroundColor = 'black';
        htmlElement.style.paddingTop = '6vh';
    }, []);

    return (
        <div style={{ borderRadius: '8px', boxShadow: '0px 0px 6px 1px yellow' }}>
            <div
                // Navbar parent container
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    backgroundColor: 'black',
                    height: '7vh'
                }}>
                <UserProfileCardContainer />
                <SearchBar />
                <Logo />
            </div>

            <div
                // Sidebar Parent Container (contains organizations, channels, direct messages)
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                    className='flex-center'
                    style={{
                        borderBottomLeftRadius: '8px',
                        height: '91vh',
                        width: '100%',
                        backgroundColor: 'black',
                        color: 'white'
                    }}>
                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', borderBottom: '3px solid rgb(30, 30, 30)', overflowY: 'auto' }}>
                        <OrgContainer />
                    </div>

                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', overflowY: 'auto' }}>
                        <ChannelContainer />
                    </div>

                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', borderTop: '3px solid rgb(30, 30, 30)', borderBottomLeftRadius: '8px', overflowY: 'auto' }}>
                        <DmChannelContainer />
                    </div>
                </div>

                <div
                    // Messages/ChatBar Parent Container
                    style={{
                        backgroundColor: 'black',
                        borderBottomRightRadius: '8px',
                        width: '77.7vw'
                    }}>
                    <div className='flex-center'>
                        {
                            currImgViewing.length < 1 ?
                            <div
                            style={{
                                backgroundColor: 'rgb(15, 15, 15)',
                                border: '4px solid rgb(30, 30, 30)',
                                borderRadius: '12px',
                                height: '69vh',
                                width: '76vw',
                                overflowY: 'auto'
                            }}>
                                <MsgContainer />
                            </div>
                            :
                            <div
                            className="flex-center"
                            style={{
                                background: 'black',
                                border: '4px solid rgb(30, 30, 30)',
                                borderRadius: '12px',
                                height: '70vh',
                                width: '80vw',
                                overflowY: 'auto'
                            }}>
                                <CloseOutline
                                onClick={() => dispatch(clearCurrImgUrl())}
                                style={{color: 'white', marginTop: '0.2vh', height: '4vh', cursor: 'pointer'}}>
                                </CloseOutline>
                                <img
                                style={{
                                    marginTop: '0.5vh',
                                    borderRadius: '12px',
                                    height: '69vh',
                                    width: '69vw'
                                }}
                                src={currImgViewing}>
                                </img>
                            </div>
                        }
                    </div>

                    <div className='flex-center'>
                        <div
                            style={{
                                backgroundColor: 'black',
                                marginTop: '0.4vh',
                                marginRight: '0.5vw',
                                height: '18vh',
                                width: '77.3vw',
                                color: 'white'
                            }}>
                            <MessagingBox />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseContainer;
