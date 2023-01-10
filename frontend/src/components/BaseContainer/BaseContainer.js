import OrgContainer from "../Organization/OrgContainer.js";
import DmChannelContainer from "../DmChannels/DmChannelContainer.js";
import MessagingBox from "../MessagingBox/MessagingBox.js";
import MsgContainer from '../Messages/MsgContainer.js';
import SearchBar from "../SearchBar/SearchBar.js";
import ChannelContainer from "../ChannelsContainer/ChannelContainer.js";
import UserProfileCardContainer from "../UserProfile/UserProfileCardContainer.js";
import UserProfileCard from "../UserProfile/UserProfileCard.js";

const BaseContainer = () => {
    /***************************************************************
    Red borders outline the dimensions of parent containers.
    Once you have added your component, remove the borders/comments.
    'Display' specifiers on parent containers may need to be modified
    once components are integrated. Width may need to be adjusted.
    ****************************************************************/

    return (
        <div style={{ borderRadius: '8px', boxShadow: '0px 0px 8px black' }}>
            <div
                // Navbar parent container
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    backgroundColor: 'black',
                    height: '7vh'
                }}>
                <SearchBar />
            </div>

            <div
                // Userprofile parent container
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    backgroundColor: 'black',
                    height: '7vh'
                }}>
                <UserProfileCardContainer />
            </div>

            <div
                // Sidebar Parent Container (contains organizations, channels, direct messages)
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                    className='flex-center'
                    style={{
                        borderBottomLeftRadius: '8px',
                        height: '91vh',
                        width: '20vw',
                        backgroundColor: 'black',
                        color: 'white'
                    }}>
                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', borderTop: '2px solid rgb(30, 30, 30)', overflowY: 'auto' }}>
                        <OrgContainer />
                    </div>

                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', overflowY: 'auto' }}>
                        <ChannelContainer />
                    </div>

                    <div
                        className='flex-center'
                        style={{ height: '29.7vh', width: 'inherit', borderBottom: '2px solid rgb(30, 30, 30)', borderBottomLeftRadius: '8px', overflowY: 'auto' }}>
                        <DmChannelContainer />
                    </div>
                </div>

                <div
                    // Messages/ChatBar Parent Container
                    style={{
                        backgroundColor: 'black',
                        borderBottomRightRadius: '8px',
                        width: '79vw'
                    }}>
                    <div className='flex-center'>
                        <div
                            style={{
                                background: 'rgb(200, 200, 0)',
                                border: '4px solid rgb(30, 30, 30)',
                                borderRadius: '12px',
                                height: '70vh',
                                width: '78vw',
                                overflowY: 'auto'
                            }}>
                            <MsgContainer />
                        </div>
                    </div>

                    <div className='flex-center'>
                        <div
                            style={{
                                backgroundColor: 'black',
                                marginTop: '0.4vh',
                                height: '18vh',
                                width: '76vw',
                                color: 'white'
                            }}>
                            <MessagingBox />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseContainer;
