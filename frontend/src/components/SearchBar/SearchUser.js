import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createDmMessageChannelThunk } from '../../store/messagesReducer';
import { fetchOrgDataThunk } from '../../store/organizationReducer';

const SearchUser = ({ currOrgId, email, firstName, lastName }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [startedDm, setStartedDm] = useState(false);

    useEffect(() => {
        if (startedDm === true) dispatch(fetchOrgDataThunk(currOrgId));
    }, [startedDm]);

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            lineHeight: '4vh',
            fontWeight: 'bold',
            marginTop: '1vh',
            marginBottom: '2vh',
            marginLeft: '1vw',
            borderRadius: '8px',
            backgroundColor: 'rgb(240, 210, 10)',
            borderBottom: '4px solid rgb(165, 165, 0)',
            width: '50vw',
            height: '8vh'
        }}>
            <p style={{marginLeft: '2vw'}}>{firstName} {lastName}</p>

            <div
            onClick={() => {
                if (startedDm === false) dispatch(createDmMessageChannelThunk(user.id, currOrgId, [email]));

                setStartedDm(true);
            }}
            style={{
                marginTop: '1.2vh',
                marginRight: '1vw',
                backgroundColor: 'rgb(20, 20, 20)',
                lineHeight: '5vh',
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                minWidth: '5vw',
                height: '5vh',
                border: '4px solid transparent',
                borderBottom: '4px solid rgb(15, 15, 15)',
                borderRadius: '6px',
                cursor: 'pointer'
            }}>
                Message
            </div>
        </div>
    );
};

export default SearchUser;