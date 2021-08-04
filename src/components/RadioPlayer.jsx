import './RadioPlayer.css';

const RadioPlayer = station => {
    if (!station.name) {
        return null;
    }

    return (
        <div className="radio-player">
            <img className="song-img" src={station.img} alt={station.img} />
            <div className="song-name">{station.name}</div>
            <button className="btn-player">
                <i className="icon-play"></i>
            </button>
        </div>
    );
};

export default RadioPlayer;
