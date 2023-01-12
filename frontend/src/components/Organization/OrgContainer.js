import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExpandMore } from '@styled-icons/material-sharp/ExpandMore';
import { ExpandLess } from '@styled-icons/material-twotone/ExpandLess';

import { getUserThunk } from '../../store/sessionReducer.js';
import { createOrgThunk } from '../../store/organizationReducer.js';

import Organization from "./Organization.js";

const OrgContainer = () => {
    const dispatch = useDispatch();

    const currUser = useSelector(state => state.session.user);
    const userOrgs = useSelector(state => state.session.user.user_organizations);

    const [clickedCreateOrg, setClickedCreateOrg] = useState(false);
    const [clickedExpand, setClickedExpand] = useState(false);
    const [clickedCreate, setClickedCreate] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [img, setImg] = useState('');

    useEffect(() => {
        if (clickedCreate === true) {
            dispatch(getUserThunk(currUser.id));

            setClickedCreate(false);
        };
    }, [clickedCreate]);

    return (
        <div style={{maxWidth: '16vw'}}>
            <div
            className='flex-center'
            style={{
                fontSize: '14px',
                marginTop: '0.5vh',
                borderBottom: '2px solid rgb(30, 30, 30)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '16vw',
                    textAlign: 'center',
                    fontSize: '16px',
                    marginTop: '1vh',
                }}>
                    <p style={{marginLeft: '0.4vw', maxWidth: '8vw'}}>Organizations</p>

                    <ExpandMore
                        onClick={e => {
                            e.stopPropagation();
                            setClickedExpand(clicked => !clicked);
                        }}
                        style={{
                            display: clickedExpand ? 'none' : 'block',
                            marginTop: '1.5vh',
                            color: 'yellow',
                            height: '4vh',
                            cursor: 'pointer'
                        }}>
                    </ExpandMore>

                    <ExpandLess
                        onClick={e => {
                            e.stopPropagation();
                            setClickedExpand(clicked => !clicked);

                            setClickedCreateOrg(false);
                        }}
                        style={{
                            display: clickedExpand ? 'block' : 'none',
                            marginTop: '1.5vh',
                            color: 'yellow',
                            height: '4vh',
                            cursor: 'pointer'
                        }}>
                    </ExpandLess>
                </div>

                <div 
                onClick={() => setClickedCreateOrg(clicked => !clicked)}
                className='buzz-btn'
                style={{
                    display: clickedExpand && !clickedCreateOrg ? 'block' : clickedCreateOrg ? 'none' : 'none',
                    marginTop: '2vh',
                    marginBottom: '3vh',
                    lineHeight: '4vh',
                    width: '12vw',
                    height: '4vh'
                }}>
                    Create New Organization
                </div>

                <div style={{display: clickedCreateOrg ? 'block' : 'none'}}>
                    <input
                    id='search-input'
                    autoComplete='off'
                    placeHolder={`Organization name`}
                    onChange={e => setOrgName(e.target.value)}
                    value={orgName}
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

                    <input
                    id='search-input'
                    autoComplete='off'
                    placeHolder={`Organization image (URL)`}
                    onChange={e => setImg(e.target.value)}
                    value={img}
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

                    <div
                    onClick={() => {
                        dispatch(createOrgThunk(orgName, currUser.id, img));

                        setClickedCreate(true);

                        setImg('');
                        setOrgName('');
                        setClickedCreateOrg(false);
                        setClickedExpand(false);
                    }}
                    className='flex-center buzz-btn'
                    style={{
                        marginTop: '2vh',
                        marginBottom: '3vh',
                        lineHeight: '4vh',
                        width: '12vw',
                        height: '4vh'
                    }}>
                        Create
                    </div>
                </div>
            </div>
            {
                userOrgs.map((org, i) => <Organization orgId={org.organization_id} orgName={org.organization_name} orgOwnerId={org.organization_owner} totalUsers={org.total_users} totalChannels={org.total_channels} totalDmChannels={org.total_dm_channels} key={i} />)
            }
        </div>
    );
};

export default OrgContainer;
