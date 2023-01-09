import { useSelector } from "react-redux";
import Channel from "./Channel";

const ChannelContainer = () => {

    const currentChannel = useSelector(state => state.channel);
    const allChannelsInOrg = useSelector(state => state.organization.organization_channels);
    const currentUser = useSelector(state => state.session.user);

    return (
        <div>
            {allChannelsInOrg && allChannelsInOrg.length && (
                allChannelsInOrg.filter(el => el.isPublic && el.name !== currentChannel.name).map((el, i) =>
                    <Channel channelId={el.id} channelName={el.name} ownerId={el.owner_id} messages={el.channel_cm} totalUsers={el.channel_users.length} />)
            )}
            {allChannelsInOrg && allChannelsInOrg.length && (
                allChannelsInOrg && allChannelsInOrg.map(el => el.channel_users.includes(currentUser.username) &&
                    !el.isPublic && el.name !== currentChannel.name &&
                    <Channel channelId={el.id} channelName={el.name} ownerId={el.owner_id} messages={el.channel_cm} totalUsers={el.channel_users.length} />)
            )}
        </div>
    )
}

export default ChannelContainer;
