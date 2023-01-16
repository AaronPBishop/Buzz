import ChannelUser from './ChannelUser.js';

const ChannelUsersContainer = ({ channelId, ownerId, users }) => {
    return (
        <div 
        className='flex-center'
        style={{
            marginTop: '2vh',
            border: '2px solid rgb(30, 30, 30)',
            borderRadius: '8px', 
            backgroundColor: 'rgb(15, 15, 15)', 
            width: '14vw',
            height: '22vh',
            overflowY: 'auto'
        }}>
            {
                users.map((user, i) => 
                <ChannelUser channelId={channelId} ownerId={ownerId} userId={user.id} firstName={user.first_name} lastName={user.last_name} userName={user.username} key={i} />
                )
            }
        </div>
    );
};

export default ChannelUsersContainer;