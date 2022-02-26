import { useState } from 'react';
import { stationList } from '../data/stations';
import RadioPlayer from './RadioPlayer';

import './Radio.css';

const Radio = () => {
    const [nowPlaying, setNowPlaying] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    const playStation = station => {
        if (nowPlaying === station) {
            togglePlay();
            return;
        }
        setNowPlaying(station);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <div className="radio">
            <ul className="stations">
                {(stationList || []).map(station => (
                    <li
                        className={`station 
                            ${nowPlaying === station ? 'station-selected' : ''}
                        `}
                        key={station.url}
                    >
                        <img
                            src={station.img}
                            alt={station.img}
                            className="station-img"
                        />
                        <div className="station-name">{station.name}</div>
                        <button
                            className="btn-play"
                            onClick={e => playStation(station)}
                        >
                            <i
                                className={
                                    nowPlaying === station && isPlaying
                                        ? 'icon-pause'
                                        : 'icon-play'
                                }
                            ></i>
                        </button>
                    </li>
                ))}
            </ul>

            <RadioPlayer
                {...nowPlaying}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
            />
        </div>
    );
};

export default Radio;
