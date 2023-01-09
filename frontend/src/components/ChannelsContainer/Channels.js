import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getChannelThunk } from "../../store/channelReducer";
import { useEffect } from "react";
import '../../../src/index.css'

const ChannelNavigation = () => {

    const dispatch = useDispatch();

    const [showAllChannels, setShowAllChannels] = useState(false);
    const [closeAllChannels, setCloseAllChannels] = useState(true);
    const currentChannel = useSelector(state => state.channel);
    const allChannelsInOrg = useSelector(state => state.organization.organization_channels);
    const currentUser = useSelector(state => state.session.user);

    // useEffect(() => {
    //     allChannelsInOrg && console.log(allChannelsInOrg);
    //     allChannelsInOrg && console.log(allChannelsInOrg[1].channel_users.includes(currentUser.username));
    // }, []);

    const handleClick = (e) => {
        e.preventDefault();
        setCloseAllChannels(!closeAllChannels);
        setShowAllChannels(!showAllChannels);
    }

    const handleChannelSelection = (e, id) => {
        e.preventDefault();
        dispatch(getChannelThunk(id));
        setCloseAllChannels(!closeAllChannels);
        setShowAllChannels(!showAllChannels);
    }

    return (
        <div>
            <div>
                <div style={{
                    display: 'flex',
                    textAlign: 'center',
                    fontSize: '16px',
                    marginTop: '1vh',
                    padding: '0.8vh',
                    cursor: 'pointer',
                    borderTop: '2px solid rgb(30, 30, 30)',
                    borderBottom: '2px solid rgb(30, 30, 30)'
                }}>
                    <div style={{
                        marginRight: '10px',
                        color: 'rgb(240, 210, 10)'
                    }}>Channels</div>
                    <div onClick={(e) => handleClick(e)} className="expand-btn" style={{
                        marginLeft: '6vw',
                        width: '2vw',
                        height: '2.5vh',
                        backgroundColor: 'rgb(240, 210, 10)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}></div>
                </div>
            </div>
            <div style={{
                background: 'rgb(240, 210, 10)',
                color: 'black',
                borderRadius: '2px',
                padding: '0 5px'
            }}># {currentChannel.name}</div>
            {showAllChannels && (
                <div style={{
                    color: 'rgb(240, 210, 10)',
                    cursor: 'pointer',
                    padding: '0 5px'
                }}>
                    {allChannelsInOrg && allChannelsInOrg.length && (
                        allChannelsInOrg.filter(el => el.isPublic && el.name !== currentChannel.name).map(el => {
                            return (
                                <div onClick={(e) => handleChannelSelection(e, el.id)} style={{
                                    marginTop: '10px'
                                }}># {el.name}</div>
                            )
                        })
                    )}
                    {allChannelsInOrg && allChannelsInOrg.length && (
                        <div style={{
                            marginTop: '10px'
                        }}>
                            {allChannelsInOrg && allChannelsInOrg.map(el => el.channel_users.includes(currentUser.username)
                                && !el.isPublic && el.name !== currentChannel.name && <div onClick={(e) => handleChannelSelection(e, el.id)}># {el.name}</div>)
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}

export default ChannelNavigation;
