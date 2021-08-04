import { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';

import './RadioPlayer.css';

export const VideoJS = props => {
    const videoRef = useRef(null);
    const { options } = props;

    const VideoHtml = props => (
        <div className="hidden-player" data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );

    useEffect(() => {
        const videoElement = videoRef.current;
        let player;
        if (videoElement) {
            player = videojs(videoElement, options, () => {
                console.log('player is ready');
            });
        }
        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [options]);

    return <VideoHtml />;
};

const RadioPlayer = ({ name, img, url, isPlaying, togglePlay }) => {
    return name ? (
        <div className="radio-player">
            <img className="song-img" src={img} alt={img} />
            <div className="song-name">{name}</div>
            <button className="btn-player" onClick={togglePlay}>
                <i className={isPlaying ? 'icon-pause' : 'icon-play'}></i>
            </button>

            <VideoJS
                options={{
                    autoplay: true,
                    sources: [
                        {
                            src: url,
                            type:
                                url.split('.').splice(-1) === 'm3u8'
                                    ? 'application/x-mpegURL'
                                    : 'audio/mp3',
                        },
                    ],
                }}
            />
        </div>
    ) : null;
};

export default RadioPlayer;
