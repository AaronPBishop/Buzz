import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/sessionReducer";

const DemoLogin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleButtonClick = async () => {
        await dispatch(login("demoUser@buzz.com", "password"));
    };

    if (user) return <Redirect to="/home" />;

    return (
        <div onClick={handleButtonClick}>
            <button
                style={{
                    fontSize: "16px",
                    borderRadius: "7px",
                    height: "34px",
                    width: "130px",
                    backgroundColor: "rgb(10, 91, 240)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer"

                }}>
                Demo Login
            </button>
        </div>
    );
};

export default DemoLogin;
