import ChannelUser from './ChannelUser.js';

const ChannelUsersContainer = ({ users }) => {
    return (
        <div>
            {
                users.map((user, i) => {
                    <ChannelUser user={user} key={i} />
                })
            }
        </div>
    );
};

export default ChannelUsersContainer;