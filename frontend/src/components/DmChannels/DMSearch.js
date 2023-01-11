import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearUserEmails, createDmMessageChannelThunk } from '../../store/messagesReducer.js';
import { fetchOrgDataThunk } from '../../store/organizationReducer.js';

import DSUser from './DSUser.js';

const DMSearch = () => {
    const dispatch = useDispatch();

    const currentOrg = useSelector(state => state.organization);
    const currUser = useSelector(state => state.session.user);
    const userEmails = useSelector(state => state.messages.usersToAdd);

    const [input, setInput] = useState('');
    const [clicked, setClicked] = useState(false);
    const [clickedCreate, setClickedCreate] = useState(false);

    useEffect(() => {
        if (clickedCreate === true) dispatch(fetchOrgDataThunk(currentOrg.id));
    }, [clickedCreate]);

    return (
        <div style={{width: 'inherit'}}>
            <input
            id='search-input'
            autoComplete='off'
            placeHolder={`Search ${currentOrg.name} users...`}
            onChange={e => setInput(e.target.value)}
            onClick={() => setClicked(true)}
            value={input}
            className='flex-center'
            style={{
                marginTop: '1.2vh',
                marginRight: '10vw',
                marginBottom: '1vh',
                fontFamily: 'Roboto',
                fontSize: '14px',
                letterSpacing: '1px',
                color: 'white',
                backgroundColor: 'rgb(20, 20, 20)',
                width: '14vw',
                height: '4vh',
                border: '2px solid rgb(30, 30, 30)',
                borderRadius: '8px'
            }}>
            </input>

            <div style={{
                display: clicked ? 'block' : 'none',
                marginTop: '1vh',
                marginLeft: '0.1vw',
                marginBottom: '2vh',
                border: '2px solid rgb(30, 30, 30)',
                borderRadius: '8px', 
                backgroundColor: 'rgb(15, 15, 15)', 
                width: '14vw',
                height: '22vh',
                overflowY: 'auto'
            }}>
                <div
                style={{
                    lineHeight: '3vh',
                    marginTop: '1.2vh',
                    marginLeft: '1.8vw',
                    marginBottom: '2vh',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    color: 'black',
                    width: '10vw',
                    height: '3vh',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    backgroundColor: 'rgb(240, 210, 10)',
                    borderBottom: '3px solid rgb(165, 165, 0)',
                    cursor: 'pointer'
                }}
                onClick={() => setClicked(false)}>
                    Close
                </div>

                <div className="flex-center">
                    {
                        input.length < 1 && currentOrg.organization_users ?
                        currentOrg.organization_users.map((user, i) => {
                            if (user.id !== currUser.id) return (
                                <DSUser userEmail={user.email} firstName={user.first_name} lastName={user.last_name} />
                            );
                        })
                        :
                        input.length > 0 && currentOrg.organization_users &&
                        currentOrg.organization_users.map((user, i) => {
                            if (user.id !== currUser.id && (user.first_name.toLowerCase() + user.last_name.toLowerCase()) === input.replace(/\s/g, '').toLowerCase()) return (
                                <DSUser userEmail={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );

                            if (user.id !== currUser.id && user.first_name.toLowerCase() === input.toLowerCase()) return (
                                <DSUser userEmail={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );

                            if (user.id !== currUser.id && user.last_name.toLowerCase() === input.toLowerCase()) return (
                                <DSUser userEmail={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );
                        })
                    }
                </div>
            </div>

            <div
            onClick={() => {
                dispatch(clearUserEmails());
                dispatch(createDmMessageChannelThunk(currUser.id, currentOrg.id, userEmails));

                setClickedCreate(true);
                setClicked(false);
            }}
            className='flex-center'
            style={{
                marginTop: '2vh',
                marginBottom: '3vh',
                fontWeight: 'bold',
                color: 'black',
                lineHeight: '4vh',
                borderRadius: '8px',
                backgroundColor: 'rgb(240, 210, 10)',
                borderBottom: '4px solid rgb(165, 165, 0)',
                width: '12vw',
                height: '4vh',
                cursor: 'pointer'
            }}>
                Create
            </div>
        </div>
    );
};

export default DMSearch;