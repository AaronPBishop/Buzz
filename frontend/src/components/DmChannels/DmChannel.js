import { useDispatch, useSelector } from 'react-redux';

import { clearChannelMessageData, populateCurrMessages, setViewingDm } from '../../store/messagesReducer.js';
import { getUserThunk } from '../../store/sessionReducer.js';
import { deleteDmMessageChannelThunk, clearDmChannel, fetchOrgDataThunk } from '../../store/organizationReducer.js';

import { CloseCircle } from '@styled-icons/ionicons-outline/CloseCircle';
import { useEffect } from 'react';

const DmChannel = ({ orgId, messages, users, ownerId, id }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const messageState = useSelector(state => state.messages);
    const currOrg = useSelector(state => state.organization);

    useEffect(() => {
        if (orgId !== currOrg.id) return;

        if (messageState.currChannelId && messageState.currChannelId === id) {
            const fetchInterval = setInterval(async () => {
                await dispatch(fetchOrgDataThunk(currOrg.id));
                await dispatch(populateCurrMessages(messages));
            }, [2000]);

            return () => clearInterval(fetchInterval);
        } else {
            return;
        };
    }, [messageState, messageState.currChannelId, currOrg.id]);

    const formatNames = (names) => {
        let formatted = '';

        if (names.length < 3) {
            formatted += names[0] + ', ' + names[1];
            return formatted;
        };

        if (names.length >= 3) {
            for (let i = 0; i < 3; i++) {
                if (i < 2) formatted += names[i] + ', ';
                else formatted += names[i];
            };

            return formatted + '...';
        };
    };

    return (
        <div
        className={messageState.currChannelId === id && 'selected'}
        onClick={async () => {
            await dispatch(setViewingDm(id));
            await dispatch(fetchOrgDataThunk(currOrg.id));
            await dispatch(populateCurrMessages(messages));
        }}
        style={{
            display: 'flex',
            justifyContent: user.id === ownerId ? 'space-between' : 'center',
            textAlign: 'center',
            minWidth: '16vw',
            maxWidth: '16vw',
            fontSize: '14px',
            marginTop: '1vh',
            padding: '0.8vh',
            cursor: 'pointer',
            borderTop: '2px solid rgb(30, 30, 30)',
            borderBottom: '2px solid rgb(30, 30, 30)'
        }}>
            {users.length > 2 ? formatNames(users.filter(el => el !== user.username)) : users.filter(el => el !== user.username)}

            <CloseCircle
            onClick={async e => {
                e.stopPropagation();

                await dispatch(deleteDmMessageChannelThunk(id));
                await dispatch(getUserThunk(user.id))
                await dispatch(clearDmChannel(id));
                await dispatch(clearChannelMessageData());
            }}
            style={{
                display: user.id !== ownerId && 'none',
                width: '22px',
                marginLeft: '0.8vw',
                marginBottom: '0.4vh',
                cursor: 'pointer'
            }}>
            </CloseCircle>
        </div>
    );
};

export default DmChannel;
