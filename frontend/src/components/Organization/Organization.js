import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrgDataThunk } from "../../store/organizationReducer";

const Organization = ({ orgId, orgName, orgOwnerId }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const currOrg = useSelector(state => state.organization);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (orgId === user.user_organizations[0].organization_id) dispatch(fetchOrgDataThunk(orgId));
    }, [user.id])

    const keyMap = {
        organization_users: 'Users',
        organization_channels: 'Channels',
        organization_dmMessage_channels: 'Direct Messages'
    };

    if (!currOrg.organization_users) return <div className="flex-center">Loading...</div>

    return (
        <div
        onClick={() => dispatch(fetchOrgDataThunk(orgId))}
        className={(currOrg && currOrg.id) && (currOrg.id === orgId) && 'selected'}
        style={{

            textAlign: 'center',
            fontSize: '16px',
            marginTop: '1vh',
            padding: '0.8vh',
            cursor: 'pointer',
            borderTop: '2px solid rgb(30, 30, 30)',
            borderBottom: '2px solid rgb(30, 30, 30)'
        }}>
            {orgName}

            <button 
            onClick={e => {
                e.stopPropagation();
                setClicked(clicked => !clicked);
            }}
            style={{
                marginLeft: '6vw',
                width: '2vw', 
                height: '2.5vh',
                backgroundColor: 'yellow',
                borderRadius: '6px',
                cursor: 'pointer'
            }} 
            className={clicked ? 'collapse-btn' : 'expand-btn'}>
            </button>

            <div style={{display: clicked ? 'flex' : 'none', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4vh'}}>
                {
                    Object.keys(keyMap).map((key, i) => {
                        return (
                            <div style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                                <div style={{textAlign: 'left', width: '10vw', marginBottom: '1vh'}}>{keyMap[key]}:</div>
                                <div style={{textAlign: 'right', width: '2vw'}}>{currOrg[key].length}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Organization;