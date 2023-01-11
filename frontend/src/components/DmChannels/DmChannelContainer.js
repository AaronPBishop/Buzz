import { useState } from 'react';
import { useSelector } from 'react-redux';

import DMSearch from './DMSearch';
import DmChannel from "./DmChannel";

const DmChannelContainer = () => {
    const user = useSelector(state => state.session.user);
    const orgDmChannels = useSelector(state => state.organization.organization_dmMessage_channels);

    const [clickedCreateGC, setClickedCreateGC] = useState(false);

    return (
        <div style={{width: '14vw'}}>
            <div 
            onClick={() => setClickedCreateGC(clicked => !clicked)}
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
                Create Group Chat
            </div>

            <div style={{display: clickedCreateGC ? 'block' : 'none'}}>
                <DMSearch />
            </div>

            {
                orgDmChannels && orgDmChannels.map((channel, i) => channel.dmMessage_channel_users.includes(user.username) && (
                <div>
                    <DmChannel messages={channel.dmMessage_channel_dmMessages} users={channel.dmMessage_channel_users} ownerId={channel.owner_id} id={channel.id} key={i} />
                </div>
                ))
            }
        </div>
    );
};

export default DmChannelContainer;