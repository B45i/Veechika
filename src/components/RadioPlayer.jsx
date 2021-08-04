import { useEffect, useState } from 'react';

import './RadioPlayer.css';

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    const [audio] = useState(new Audio(url));

    useEffect(() => {
        console.log('audio change');
    }, [audio]);

    useEffect(() => {
        console.log('play change');
        isPlaying ? audio.play() : audio.pause();
    }, [isPlaying]);

    useEffect(() => {
        audio.addEventListener('ended', () => togglePlay(false));
        return () => {
            audio.removeEventListener('ended', () => togglePlay(false));
        };
    }, []);

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
