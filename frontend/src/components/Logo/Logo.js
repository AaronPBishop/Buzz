import "./Logo.css"

const Logo = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "8vw",
                height: "4vh",
                backgroundColor: "yellow",
                marginTop: "0.8vh",
                marginBottom: "auto",
                marginRight: "20px",
                marginLeft: "-28vw",
                cursor: "default",
            }}
            className="buzz-btn">
            <div style={{display: 'flex',}} >
                <img
                className="logo_img"
                src={require("./bee.png").default}
                style={{
                    bottom: "1.4vh",
                    zIndex: "100",
                    width: "100%",
                    height: "55px",
                }}>
                </img>
            </div>

            <div
                style={{
                    fontStyle: "bold",
                    fontSize: "20px",
                    marginTop: "0.1vh",
                    marginRight: "0.5vw",
                    padding: "5px",
                }}>
                Buzz
            </div>
        </div>
    );
};

export default Logo;
