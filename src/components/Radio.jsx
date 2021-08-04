import { useState } from 'react';
import { stationList } from '../data/stations';

import './Radio.css';
import RadioPlayer from './RadioPlayer';

const Radio = () => {
    const [nowPlaying, setNowPlaying] = useState();

    const play = station => {
        setNowPlaying(station);
    };

    return (
        <div className="radio">
            <ul className="stations">
                {(stationList || []).map(station => (
                    <li
                        className={`station 
                            ${nowPlaying === station ? 'station-selcted' : ''}
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
                            onClick={e => play(station)}
                        >
                            <i className="icon-play"></i>
                        </button>
                    </li>
                ))}
            </ul>

            <RadioPlayer {...nowPlaying} />
        </div>
    );
};

export default Radio;
