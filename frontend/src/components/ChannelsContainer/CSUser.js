import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addUserEmail } from '../../store/messagesReducer.js';
import { fetchOrgDataThunk, addUserToChannelThunk } from '../../store/organizationReducer.js';

const CSUser = ({ currOrgId, userToAddId, firstName, lastName, userEmail, type }) => {
    const dispatch = useDispatch();

    const usersToAdd = useSelector(state => state.messages.usersToAdd);
    const channelId = useSelector(state => state.messages.currChannelId);

    const [clickedAdd, setClickedAdd] = useState(false);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            color: 'black',
            lineHeight: '2.2vh',
            marginTop: '1vh',
            marginBottom: '2vh',
            borderRadius: '8px',
            backgroundColor: 'rgb(240, 210, 10)',
            borderBottom: '4px solid rgb(165, 165, 0)',
            width: '12vw',
            height: '6vh'
        }}>
            <p style={{marginLeft: '0.5vw'}}>{firstName} {lastName}</p>

            <div
            onClick={async () => {
                if (type === 'create') {
                    if (!usersToAdd.includes(userEmail)) dispatch(addUserEmail(userEmail));
                };

                if (type !== 'create') {
                    setClickedAdd(true);

                    await dispatch(addUserToChannelThunk(channelId, userToAddId));
                    await dispatch(fetchOrgDataThunk(currOrgId));
                };
            }}
            style={{
                fontWeight: 'bold',
                marginTop: '1.5vh',
                marginRight: '1vw',
                backgroundColor: 'rgb(20, 20, 20)',
                lineHeight: '2.5vh',
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                width: '2.5vw',
                height: '2.5vh',
                border: '4px solid transparent',
                borderBottom: '4px solid rgb(15, 15, 15)',
                borderRadius: '6px',
                cursor: 'pointer'
            }}>
                {(type === 'create' && usersToAdd.includes(userEmail)) ? 'Added' : (type === 'create' && !usersToAdd.includes(userEmail)) && 'Add'}
                {(type !== 'create' && clickedAdd === true) ? 'Added' : (type !== 'create' && clickedAdd === false) && 'Add'}
            </div>
        </div>
    );
};

export default CSUser;