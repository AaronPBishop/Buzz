import { useSelector } from 'react-redux';

import DmChannel from "./DmChannel";

const DmChannelContainer = () => {
    const user = useSelector(state => state.session.user);
    const orgDmChannels = useSelector(state => state.organization.organization_dmMessage_channels);

    return (
        <div style={{width: '14vw'}}>
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