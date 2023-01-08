import React, { useState } from "react";

const Message = ({ message }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <div>{/* user profile */}</div>
            <div style={{fontFamily: 'Roboto', borderRadius: '6px', backgroundColor: 'black', margin: '1px', color: 'white'}}>
                {/* user's name and message body */}
                <div
                    style={{
                        display: "flex",
                        padding: '2vw'
                    }}>
                    <p
                        style={{
                            display: "flex",
                        }}>
                        {message.user_name}:
                        {/* {message.cm_user.first_name} {message.cm_user.last_name} */}
                    </p>
                    <p>&nbsp;</p>
                    <p
                        style={{
                            display: "flex",
                        }}>
                            {message.message}
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Message;