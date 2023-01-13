import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchOrgDataThunk, removeUserFromChannelThunk } from '../../store/organizationReducer.js';

import { PersonRemove } from '@styled-icons/ionicons-sharp/PersonRemove';

const ChannelUser = ({ channelId, ownerId, userId, firstName, lastName }) => {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        if (deleted === true) {
            dispatch(fetchOrgDataThunk(currOrg.id));

            setDeleted(false);
        };
    }, [deleted]);

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
            onClick={() => {
                dispatch(removeUserFromChannelThunk(channelId, userId));

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

export default ChannelUser;