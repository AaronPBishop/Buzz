import OrgContainer from "../Organization/OrgContainer.js";

const BaseContainer = () => {
    /***************************************************************
    Red borders outline the dimensions of parent containers.
    Once you have added your component, remove the borders/comments.
    'Display' specifiers on parent containers may need to be modified
    once components are integrated. Width may need to be adjusted.
    ****************************************************************/

    return (
        <div style={{borderRadius: '8px', boxShadow: '0px 0px 8px 2px black'}}>
            <div
            // Navbar parent container
            style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                border: '2px solid red',
                backgroundColor: 'black',
                width: '98.7vw',
                height: '6vh'
            }}>
                {/* Top Navbar -> SEARCH/PROFILE COMPONENT CONTAINER */}
            </div>

            <div 
            // Sidebar Parent Container (contains organizations, channels, direct messages)
            style={{display: 'flex', justifyContent: 'space-between'}}>
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
                    style={{height: '29.7vh', width: 'inherit', overflowY: 'auto'}}>
                        <OrgContainer />
                    </div>

                    <div 
                    className='flex-center'
                    style={{height: '29.7vh', width: 'inherit', border: '1px solid red', overflowY: 'auto'}}>
                        CHANNELS
                    </div>

                    <div 
                    className='flex-center'
                    style={{height: '29.7vh', width: 'inherit', border: '1px solid red', overflowY: 'auto'}}>
                        DIRECT MESSAGE CHANNELS
                    </div>
                </div>

                <div
                // Messages/ChatBar Parent Container
                style={{
                    backgroundColor: 'black',
                    border: '2px solid red',
                    borderBottomRightRadius: '8px',
                    height: '90vh',
                    width: '79vw'
                }}>
                    <div className='flex-center'>
                        <div
                        style={{
                            background: 'linear-gradient(rgb(240, 210, 10), rgb(155, 140, 0))',
                            border: '2px solid red',
                            borderRadius: '12px',
                            height: '70vh',
                            width: '78vw',
                            overflowY: 'auto'
                        }}>
                            {/* MESSAGES CONTAINER */}
                        </div>
                    </div>

                    <div className='flex-center'>
                        <div
                        style={{
                            backgroundColor: 'black',
                            marginTop: '0.5vh',
                            border: '2px solid red',
                            borderRadius: '12px',
                            height: '18vh',
                            width: '76vw',
                            color: 'white'
                        }}>
                            {/* CHATBAR CONTAINER */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseContainer;