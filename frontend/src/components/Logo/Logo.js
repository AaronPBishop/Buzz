const Logo = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: 'yellow',
            height: '50px',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: '20px',
            marginLeft: '-20vw'
        }} className="buzz-btn">

            <img src={require('./bee.png').default} style={{
                zIndex: '100',
                width: '60px',
                height: '55px',
            }}></img>

            <div style={{
                fontSize: '30px',
                marginTop: '4px',
                marginRight: '2px',
                padding: '5px'
            }}>Buzz</div>

        </div >
    )
}

export default Logo;
