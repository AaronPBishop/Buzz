import { useDispatch, useSelector } from 'react-redux';

import { addUserEmail } from '../../store/messagesReducer.js';

const DSUser = ({ userEmail, firstName, lastName }) => {
    const dispatch = useDispatch();

    const usersToAdd = useSelector(state => state.messages.usersToAdd);

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
            onClick={() => {
                if (!usersToAdd.includes(userEmail)) dispatch(addUserEmail(userEmail));
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
                {usersToAdd.includes(userEmail) ? 'Added' : !usersToAdd.includes(userEmail) && 'Add'}
            </div>
        </div>
    );
};

export default DSUser;