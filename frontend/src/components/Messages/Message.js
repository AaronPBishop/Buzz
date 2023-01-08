import React, { useState } from "react";

const Message = ({ message }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <div>{/* user profile */}</div>
            <div>
                {/* user's name and message body */}
                <div
                    style={{
                        display: "flex",
                    }}>
                    <p
                        style={{
                            display: "flex",
                        }}>
                        {message.cm_user.first_name} {message.cm_user.last_name}
                    </p>
                    <p
                        style={{
                            display: "flex",
                        }}>
                            
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Message;
