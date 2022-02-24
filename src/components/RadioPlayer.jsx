import { useEffect, useRef } from 'react';

import './RadioPlayer.css';

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    return name ? (
        <div className="radio-player">
            <img className="song-img" src={img} alt={img} />
            <div className="song-name">{name}</div>
            <button className="btn-player" onClick={togglePlay}>
                <i className={isPlaying ? 'icon-pause' : 'icon-play'}></i>
            </button>
        </div>
    ) : null;
};

export default RadioPlayer;
