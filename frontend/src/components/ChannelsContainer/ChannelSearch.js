import { useState } from 'react';
import { useSelector } from 'react-redux';

import CSUser from './CSUser.js';

const ChannelSearch = ({ type }) => {
    const currentOrg = useSelector(state => state.organization);
    const currUser = useSelector(state => state.session.user);

    const [input, setInput] = useState('');
    const [clicked, setClicked] = useState(false);

    return (
        <div style={{width: 'inherit'}}>
            <input
            id='search-input'
            autoComplete='off'
            placeholder={type !== 'create' ? `Search ${currentOrg.name} users...` : `Add ${currentOrg.name} users...`}
            onChange={e => setInput(e.target.value)}
            onClick={() => setClicked(true)}
            value={input}
            className='flex-center'
            style={{
                marginTop: '1.2vh',
                marginBottom: '2vh',
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
                    display: type && 'none',
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
                                <CSUser currOrgId={currentOrg.id} userToAddId={user.id} firstName={user.first_name} lastName={user.last_name} userEmail={user.email} type={type} key={i} />
                            );
                        })
                        :
                        input.length > 0 && currentOrg.organization_users &&
                        currentOrg.organization_users.map((user, i) => {
                            if (user.id !== currUser.id && (user.first_name.toLowerCase() + user.last_name.toLowerCase()) === input.replace(/\s/g, '').toLowerCase()) return (
                                <CSUser currOrgId={currentOrg.id} userToAddId={user.id} userName={user.username} firstName={user.first_name} lastName={user.last_name} userEmail={user.email} type={type} key={i} />
                            );

                            if (user.id !== currUser.id && user.first_name.toLowerCase() === input.toLowerCase()) return (
                                <CSUser currOrgId={currentOrg.id} userToAddId={user.id} userName={user.username} firstName={user.first_name} lastName={user.last_name} userEmail={user.email} type={type} key={i} />
                            );

                            if (user.id !== currUser.id && user.last_name.toLowerCase() === input.toLowerCase()) return (
                                <CSUser currOrgId={currentOrg.id} userToAddId={user.id} userName={user.username} firstName={user.first_name} lastName={user.last_name} userEmail={user.email} type={type} key={i} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ChannelSearch;
