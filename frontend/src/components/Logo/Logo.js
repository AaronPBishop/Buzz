const Logo = () => {

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '8vw',
                height: '4.5vh',
                backgroundColor: 'yellow',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginRight: '20px',
                marginLeft: '-20vw',
            }}
            className="buzz-btn">

            <img
                src={require('./bee.png').default}
                style={{
                    // marginTop: '-1.5vh',
                    position: 'relative',
                    bottom: '1vh',
                    zIndex: '100',
                    width: '60px',
                    height: '55px',
                }}>
            </img>

            <div
                style={{
                    fontStyle: 'bold',
                    fontSize: '20px',
                    marginTop: '0.1vh',
                    marginRight: '0.5vw',
                    padding: '5px'
                }}>
                Buzz
            </div>

        </div>
    );
};

export default Logo;
