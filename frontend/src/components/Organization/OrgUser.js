import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getUserThunk } from '../../store/sessionReducer.js';
import { removeUserFromOrgThunk } from '../../store/organizationReducer.js';

import { PersonRemove } from '@styled-icons/ionicons-sharp/PersonRemove';

const OrgUser = ({ orgId, ownerId, userId, firstName, lastName }) => {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if (deleted === true) {
            dispatch(getUserThunk(currUser.id));

            setDeleted(false);
        };
    }, [dispatch, deleted, currUser.id]);

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
            onClick={e => {
                e.stopPropagation();
                dispatch(removeUserFromOrgThunk(orgId, userId));

                setDeleted(true);
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