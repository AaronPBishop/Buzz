import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import { fetchOrgDataThunk, createChannelThunk } from '../../store/organizationReducer.js';
import { clearUserEmails } from '../../store/messagesReducer.js';

import Channel from "./Channel";
import ChannelSearch from './ChannelSearch';

const ChannelContainer = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const currentOrg = useSelector(state => state.organization);
    const userEmails = useSelector(state => state.messages.usersToAdd);

    const [channelName, setChannelName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const [clickedCreateChannel, setClickedCreateChannel] = useState(false);
    const [clickedExpand, setClickedExpand] = useState(false);
    const [clickedCreate, setClickedCreate] = useState(false);

    useEffect(() => {
        if (clickedCreate === true) {
            dispatch(fetchOrgDataThunk(currentOrg.id));
            dispatch(clearUserEmails());

            setClickedCreate(false);
        };
    }, [dispatch, clickedCreate, currentOrg.id]);

    // const handleKeyDown = e => {
    //     if (e.key === "Enter") {
    //             dispatch(clearUserEmails());
    //             dispatch(createChannelThunk(channelName, currentOrg.id, currentUser.id, isPublic, userEmails));

    //             setClickedCreate(true);
    //             setClickedCreateChannel(false);
    //             setClickedExpand(false);
    // }}

    if (!currentUser) return <div>Loading...</div>

    if (currentUser) return (
        <div>
            <div
                className='flex-center'
                style={{
                    fontSize: '14px',
                    marginTop: '0.5vh',
                    borderBottom: '2px solid rgb(30, 30, 30)'
                }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '16vw',
                    textAlign: 'center',
                    fontSize: '16px',
                    marginTop: '1vh'
                }}>
                    <p style={{ maxWidth: '8vw', ontWeight: 'bold', fontSize: '19px', border: '1px dotted white', padding: '7px', backgroundColor: 'yellow', color: 'black'}}>Channels:</p>

                    <ExpandMore
                        onClick={e => {
                            e.stopPropagation();
                            setClickedExpand(clicked => !clicked);
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

                            setClickedCreateChannel(false);
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

                <div
                    onClick={() => setClickedCreateChannel(clicked => !clicked)}
                    className='flex-center'
                    style={{
                        display: clickedExpand && !clickedCreateChannel ? 'block' : clickedCreateChannel ? 'none' : 'none',
                        textAlign: 'center',
                        marginTop: '2vh',
                        marginBottom: '3vh',
                        fontWeight: 'bold',
                        color: 'black',
                        lineHeight: '4vh',
                        borderRadius: '8px',
                        backgroundColor: 'rgb(240, 210, 10)',
                        borderBottom: '4px solid rgb(165, 165, 0)',
                        width: '12vw',
                        height: '4vh',
                        cursor: 'pointer'
                    }}>
                    Create Channel
                </div>

                <div style={{ display: clickedCreateChannel ? 'block' : 'none' }}>
                    <input
                        id='search-input'
                        autoComplete='off'
                        placeholder={`Channel name`}
                        // onKeyDown={handleKeyDown}
                        onChange={e => setChannelName(e.target.value)}
                        value={channelName}
                        className='flex-center'
                        style={{
                            marginTop: '1.2vh',
                            marginBottom: '2vh',
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

                    <ChannelSearch type={'create'} />

                    <div
                        onClick={() => setIsPublic(pub => !pub)}
                        className='flex-center'
                        style={{
                            textAlign: 'center',
                            marginTop: '3vh',
                            marginBottom: '3vh',
                            fontWeight: 'bold',
                            color: 'black',
                            lineHeight: '4vh',
                            borderRadius: '8px',
                            backgroundColor: 'rgb(240, 210, 10)',
                            borderBottom: '4px solid rgb(165, 165, 0)',
                            width: '12vw',
                            height: '4vh',
                            cursor: 'pointer'
                        }}>
                        {isPublic === false ? 'Make Public' : 'Make Private'}
                    </div>

                    <div
                        onClick={() => {
                            dispatch(createChannelThunk(channelName, currentOrg.id, currentUser.id, isPublic, userEmails));

                            setClickedCreate(true);
                            setClickedCreateChannel(false);
                            setClickedExpand(false);
                            setChannelName('');
                            setIsPublic(false);
                        }}
                        className='flex-center'
                        style={{
                            marginTop: '2vh',
                            marginBottom: '3vh',
                            fontWeight: 'bold',
                            color: 'black',
                            lineHeight: '4vh',
                            borderRadius: '8px',
                            backgroundColor: 'rgb(240, 210, 10)',
                            borderBottom: '4px solid rgb(165, 165, 0)',
                            width: '12vw',
                            height: '4vh',
                            cursor: 'pointer'
                        }}>
                        Create
                    </div>
                </div>
            </div>

            {
                currentOrg && currentOrg.organization_channels && currentOrg.organization_channels.length > 0 &&
                currentOrg.organization_channels.filter(el => el.isPublic).map((el, i) =>
                <Channel channelId={el.id} channelName={el.name} ownerId={el.owner_id} messages={el.channel_cm} totalUsers={el.channel_users.length} usersArr={el.channel_users} key={i} />)
            }

            {
                currentOrg && currentOrg.organization_channels && currentOrg.organization_channels.length > 0 &&
                currentOrg.organization_channels.map((el, i) => (el.channel_users.includes(currentUser.username) && !el.isPublic) &&
                <Channel channelId={el.id} channelName={el.name} ownerId={el.owner_id} messages={el.channel_cm} totalUsers={el.channel_users.length} key={i} />)
            }
        </div>
    );
};

export default ChannelContainer;
