import { useSelector, useDispatch } from 'react-redux';

import { getUserThunk } from '../../store/sessionReducer.js';
import { removeUserFromOrgThunk } from '../../store/organizationReducer.js';

import { PersonRemove } from '@styled-icons/ionicons-sharp/PersonRemove';

const OrgUser = ({ orgId, ownerId, userId, firstName, lastName }) => {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);

    return (
        <div 
        className='buzz-btn'
        style={{
            display: 'flex',
            justifyContent: currUser.id === ownerId ? 'space-between' : 'center',
            margin: 'auto',
            width: '10vw',
            height: '2.5vh',
            marginTop: '2vh',
            marginBottom: '1vh',
            padding: '1vh',
            cursor: 'auto'
        }}>
            <div>{firstName} {lastName}</div>

            <PersonRemove 
            onClick={async e => {
                e.stopPropagation();

                await dispatch(removeUserFromOrgThunk(orgId, userId));
                await dispatch(getUserThunk(currUser.id));
            }}
            style={{
                display: currUser.id === ownerId ? 'block' : 'none',
                cursor: 'pointer'
            }}>
            </PersonRemove>
        </div>
    );
};

export default OrgUser;