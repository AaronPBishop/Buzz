const Logo = () => {

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '8vw',
                height: '4.8vh',
                backgroundColor: 'yellow',
                marginTop: '0.6vh',
                marginBottom: 'auto',
                marginRight: '20px',
                marginLeft: '-28vw',
            }}
            className="buzz-btn">

            <img
                src={require('./bee.png').default}
                style={{
                    position: 'relative',
                    bottom: '1.4vh',
                    zIndex: '100',
                    width: '60px',
                    height: '55px'
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
