import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import './RadioPlayer.css';

const videoElement = document.getElementById('videoTag');
const hls = new Hls();

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    const isLoading = useRef(false);
    useEffect(() => {
        if (!url || isLoading.current) {
            return;
        }
        isLoading.current = true;
        if (url.includes('.m3u8')) {
            hls.loadSource(url);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (!isPlaying) {
                    isLoading.current = false;
                    videoElement.play();
                }
            });
        } else {
            videoElement.src = url;
            isLoading.current = false;
            videoElement.play();
        }
    }, [url]);

    useEffect(() => {
        isPlaying ? videoElement.play() : videoElement.pause();
    }, [isPlaying]);

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
