import { useState } from 'react';
import { useSelector } from 'react-redux';

import DSUser from './DSUser.js';

const DMSearch = () => {
    const currentOrg = useSelector(state => state.organization);
    const currUser = useSelector(state => state.session.user);

    const [input, setInput] = useState('');
    const [clicked, setClicked] = useState(false);

    return (
        <div className='flex-center' style={{width: 'inherit'}}>
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
                <div className="flex-center">
                    {
                        input.length < 1 && currentOrg.organization_users ?
                        currentOrg.organization_users.map((user, i) => {
                            if (user.id !== currUser.id) return (
                                <DSUser userEmail={user.email} firstName={user.first_name} lastName={user.last_name} key={i} />
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
        </div>
    );
};

export default DMSearch;