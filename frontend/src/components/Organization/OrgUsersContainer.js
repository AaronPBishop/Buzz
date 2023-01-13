import { useSelector } from 'react-redux';

import OrgUser from './OrgUser.js';

const OrgUsersContainer = ({ orgId, ownerId, users }) => {
    const currUser = useSelector(state => state.session.user);

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
                    user.id !== currUser.id &&
                    <OrgUser orgId={orgId} ownerId={ownerId} userId={user.id} firstName={user.first_name} lastName={user.last_name} key={i} />
                )
            }
        </div>
    );
};

export default OrgUsersContainer;