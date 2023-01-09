import { useState } from "react";
import { useSelector } from 'react-redux';

import SearchUser from './SearchUser.js';

import './styles.css';

const SearchBar = () => {
    const currentOrg = useSelector(state => state.organization);
    const currUser = useSelector(state => state.session.user);

    const [input, setInput] = useState('');
    const [clicked, setClicked] = useState(false);

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
                fontFamily: 'Roboto',
                fontSize: '14px',
                letterSpacing: '1px',
                color: 'white',
                backgroundColor: 'rgb(20, 20, 20)',
                width: '60vw',
                height: '4vh',
                border: '2px solid rgb(30, 30, 30)',
                borderRadius: '8px'
            }}>
            </input>

            <div style={{
                display: clicked ? 'block' : 'none',
                marginTop: '1vh',
                marginLeft: '0.1vw',
                position: 'absolute', 
                border: '2px solid rgb(30, 30, 30)',
                borderRadius: '8px', 
                backgroundColor: 'rgb(15, 15, 15)', 
                width: '60vw',
                height: '40vh',
                overflowY: 'auto'
            }}>
                <div
                style={{
                    lineHeight: '3vh',
                    position: 'fixed',
                    marginTop: '1.2vh',
                    marginLeft: '0.4vw',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: 'black',
                    minWidth: '4vw',
                    maxWidth: '5vw',
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
                                <SearchUser currOrgId={currentOrg.id} email={user.email} firstName={user.first_name} lastName={user.last_name} />
                            );
                        })
                        :
                        input.length > 0 && currentOrg.organization_users &&
                        currentOrg.organization_users.map((user, i) => {
                            if (user.id !== currUser.id && (user.first_name.toLowerCase() + user.last_name.toLowerCase()) === input.replace(/\s/g, '').toLowerCase()) return (
                                <SearchUser email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );

                            if (user.id !== currUser.id && user.first_name.toLowerCase() === input.toLowerCase()) return (
                                <SearchUser email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );

                            if (user.id !== currUser.id && user.last_name.toLowerCase() === input.toLowerCase()) return (
                                <SearchUser email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchBar;