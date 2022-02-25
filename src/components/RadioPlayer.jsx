import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import './RadioPlayer.css';

const videoElement = document.getElementById('videoTag');
const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    const src =
        'https://air.pc.cdn.bitgravity.com/air/live/pbaudio044/playlist.m3u8';
    const firstRender = useRef(true);
    useEffect(() => {
        if (!url) {
            return;
        }
        if (Hls.isSupported() || src.includes('.m3u8')) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (!isPlaying) {
                    videoElement.play();
                }
            });
        }
    }, [url]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (isPlaying) {
            videoElement.pause();
        } else {
            videoElement.play();
        }
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
