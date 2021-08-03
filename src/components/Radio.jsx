import { stationList } from '../data/stations';

import './Radio.css';

const Radio = () => {
    return (
        <div className="radio">
            <ul className="stations">
                {(stationList || []).map(station => (
                    <li className="station" key={station.url}>
                        <img
                            src={station.img}
                            alt={station.img}
                            className="station-img"
                        />
                        <div className="station-name">{station.name}</div>
                        <button className="btn-play">
                            <i className="icon-play"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Radio;
