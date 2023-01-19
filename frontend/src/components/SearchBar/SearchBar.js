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
        <div style={{ width: 'inherit' }}>
            <input
                id='search-input'
                autoComplete='off'
                placeholder={`Search ${currentOrg.name} users...`}
                onChange={e => setInput(e.target.value)}
                onClick={() => setClicked(true)}
                value={input}
                className='flex-center'
                style={{
                    marginTop: '1.2vh',
                    marginRight: '14vw',
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    color: 'white',
                    backgroundColor: 'rgb(20, 20, 20)',
                    width: '50vw',
                    height: '4vh',
                    border: '2px solid rgb(30, 30, 30)',
                    borderRadius: '8px'
                }}>
            </input>

            <div style={{
                display: clicked ? 'block' : 'none',
                marginTop: '1.2vh',
                marginLeft: '-5.4vw',
                position: 'absolute',
                border: '3px solid rgb(30, 30, 30)',
                borderRadius: '8px',
                backgroundColor: 'rgb(15, 15, 15)',
                width: '60vw',
                height: '40vh',
                overflowY: 'auto'
            }}>
                <div
                    className="buzz-btn"
                    style={{
                        lineHeight: '3vh',
                        position: 'fixed',
                        marginTop: '1.2vh',
                        marginLeft: '0.4vw',
                        fontSize: '14px',
                        minWidth: '4vw',
                        maxWidth: '5vw',
                        height: '3vh'
                    }}
                    onClick={() => setClicked(false)}>
                    Close
                </div>

                <div className="flex-center">
                    {
                        currUser && input.length < 1 && currentOrg.organization_users ?
                            currentOrg.organization_users.map((user, i) => {
                                if (user.id !== currUser.id) return (
                                    <SearchUser currOrgId={currentOrg.id} email={user.email} firstName={user.first_name} lastName={user.last_name} key={i} />
                                );
                            })
                            :
                            input.length > 0 && currentOrg.organization_users &&
                            currentOrg.organization_users.map((user, i) => {
                                if (user.id !== currUser.id && (user.first_name.toLowerCase() + user.last_name.toLowerCase()) === input.replace(/\s/g, '').toLowerCase()) return (
                                    <SearchUser currOrgId={currentOrg.id} email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                                );

                                if (user.id !== currUser.id && user.first_name.toLowerCase() === input.toLowerCase()) return (
                                    <SearchUser currOrgId={currentOrg.id} email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                                );

                                if (user.id !== currUser.id && user.last_name.toLowerCase() === input.toLowerCase()) return (
                                    <SearchUser currOrgId={currentOrg.id} email={user.email} userName={user.username} firstName={user.first_name} lastName={user.last_name} key={i} />
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
