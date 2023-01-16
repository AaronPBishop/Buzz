import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchOrgDataThunk, removeUserFromChannelThunk } from '../../store/organizationReducer.js';

import { PersonRemove } from '@styled-icons/ionicons-sharp/PersonRemove';

const ChannelUser = ({ channelId, ownerId, userId, firstName, lastName, userName }) => {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    return (
        <div 
        className='buzz-btn'
        style={{
            display: currUser.username !== userName ? 'flex' : 'none',
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
            onClick={async () => {
                await dispatch(removeUserFromChannelThunk(channelId, userId));
                await dispatch(fetchOrgDataThunk(currOrg.id));
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