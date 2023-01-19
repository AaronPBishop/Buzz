import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';
import { getUserThunk } from '../../store/sessionReducer.js';
import { fetchOrgDataThunk } from '../../store/organizationReducer.js';
import { clearUserEmails, createDmMessageChannelThunk } from '../../store/messagesReducer.js';

import DMSearch from './DMSearch';
import DmChannel from "./DmChannel";

const DmChannelContainer = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const orgDmChannels = useSelector(state => state.organization.organization_dm_message_channels);
    const userEmails = useSelector(state => state.messages.usersToAdd);
    const currentOrg = useSelector(state => state.organization);

    const [clickedCreateGC, setClickedCreateGC] = useState(false);
    const [clickedExpand, setClickedExpand] = useState(false);

    if (!user) return <div>Loading...</div>;

    if (user) return (
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
                    marginTop: '1vh',
                }}>
                    <p style={{maxWidth: '8vw', fontWeight: 'bold', fontSize: '16px', marginLeft: '0.2vw'}}>Direct Messages</p>

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

                            setClickedCreateGC(false);
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
                    onClick={() => setClickedCreateGC(clicked => !clicked)}
                    className='buzz-btn'
                    style={{
                        display: clickedExpand && !clickedCreateGC ? 'block' : clickedCreateGC ? 'none' : 'none',
                        marginTop: '2vh',
                        marginBottom: '3vh',
                        lineHeight: '4vh',
                        width: '12vw',
                        height: '4vh'
                    }}>
                    Create Group Chat
                </div>

                <div style={{ display: clickedCreateGC ? 'block' : 'none' }}>
                    <DMSearch />

                    <div
                        onClick={async () => {
                            await dispatch(createDmMessageChannelThunk(user.id, currentOrg.id, userEmails));
                            await dispatch(getUserThunk(user.id))
                            await dispatch(fetchOrgDataThunk(currentOrg.id));
                            await dispatch(clearUserEmails());

                            setClickedCreateGC(false);
                            setClickedExpand(false);
                        }}
                        className='flex-center buzz-btn'
                        style={{
                            marginTop: '2vh',
                            marginBottom: '3vh',
                            lineHeight: '4vh',
                            width: '12vw',
                            height: '4vh'
                        }}>
                        Create
                    </div>
                </div>
            </div>

            {
                orgDmChannels && orgDmChannels.length > 0 &&
                orgDmChannels.map((channel, i) => channel.dm_message_channel_users.includes(user.username) && (
                    <div className='flex-center' key={i}>
                        <DmChannel orgId={channel.organization_id} messages={channel.dm_message_channel_dm_messages} users={channel.dm_message_channel_users} ownerId={channel.owner_id} id={channel.id} />
                    </div>
                ))
            }
        </div>
    );
};

export default DmChannelContainer;
