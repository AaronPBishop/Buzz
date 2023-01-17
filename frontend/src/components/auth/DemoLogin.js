import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/sessionReducer";

const DemoLogin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleButtonClick = async () => {
        await dispatch(login("buzzybee@buzz.com", "password"));
    };

    if (user) return <Redirect to="/home" />;

    return (
        <div 
        className="buzz-btn" 
        style={{marginTop: '6vh', padding: '0.5vw', width: '18vw', height: '5.4vh'}} 
        onClick={handleButtonClick}>
            <div
            className="flex-center"
            style={{
                lineHeight: '5.5vh',
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: '1vh',
                borderRadius: '14px',
                backgroundColor: 'black',
                color: 'white',
                height: "5.8vh",
                marginTop: '0.1vh',
                width: "12vw",
                cursor: "pointer"
            }}>
                Demo Login
            </div>
        </div>
    );
};

export default DemoLogin;
