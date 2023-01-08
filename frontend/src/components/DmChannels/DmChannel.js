import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { populateCurrMessages, setViewingDm } from '../../store/messagesReducer.js';
import { deleteDmMessageChannelThunk } from '../../store/dmMessageChannelReducer.js';
import { fetchOrgDataThunk } from "../../store/organizationReducer.js";

import { CloseSquareOutline } from '@styled-icons/evaicons-outline/CloseSquareOutline'

const DmChannel = ({ messages, users, ownerId, id, isSelected }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [validUsers] = useState(users.filter(el => el !== user.username));
    const [clickedDeleted, setClickedDeleted] = useState(false);

    useEffect(() => {
        if (isSelected[0] !== id) isSelected[1] = false;
    }, [isSelected]);

    useEffect(() => {
        if (clickedDeleted === true) dispatch(fetchOrgDataThunk(currOrg.id));
    }, [clickedDeleted]);

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
        className={isSelected[1] && 'selected'}
        onClick={() => {
            dispatch(setViewingDm(id));
            dispatch(populateCurrMessages(messages));
        }}
        style={{
            textAlign: 'center',
            fontSize: '14px',
            marginTop: '1vh',
            padding: '0.8vh',
            cursor: 'pointer',
            borderTop: '2px solid rgb(30, 30, 30)',
            borderBottom: '2px solid rgb(30, 30, 30)'
        }}>
            {validUsers.length > 1 ? formatNames(validUsers) : validUsers}

            <CloseSquareOutline
            onClick={e => {
                e.stopPropagation();

                dispatch(deleteDmMessageChannelThunk(id));
                setClickedDeleted(true);
            }}
            style={{
                display: user.id !== ownerId && 'none',
                width: '22px',
                marginLeft: '0.8vw',
                marginBottom: '0.4vh',
                cursor: 'pointer'
            }}>
            </CloseSquareOutline>
        </div>
    );
};

export default DmChannel;