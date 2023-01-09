import { useDispatch } from 'react-redux';

const SearchUser = ({ id, email, userName, firstName, lastName }) => {
    const dispatch = useDispatch();

    return (
        <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            lineHeight: '4vh',
            fontWeight: 'bold',
            marginTop: '2vh',
            borderRadius: '8px',
            backgroundColor: 'rgb(240, 210, 10)',
            borderBottom: '4px solid rgb(165, 165, 0)',
            width: '50vw',
            height: '8vh'
        }}>
            <p style={{marginLeft: '2vw'}}>{firstName} {lastName}</p>

            <div
            onClick={() => dispatch()}
            style={{
                marginTop: '1.2vh',
                marginRight: '1vw',
                backgroundColor: 'rgb(20, 20, 20)',
                lineHeight: '5vh',
                textAlign: 'center',
                fontSize: '12px',
                color: 'white',
                minWidth: '5vw',
                height: '5vh',
                border: '4px solid transparent',
                borderBottom: '4px solid rgb(15, 15, 15)',
                borderRadius: '6px',
                cursor: 'pointer'
            }}>
                Message
            </div>
        </div>
    );
};

export default SearchUser;