import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { images } from '../../constants/images';
import { Song } from '../../types';
import { getSongs } from '../../modules/query-hook';
import { useSelectedSong } from '../../context/selectedSongContext';



const AudioPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const { selectedSong, setSelectedSong } = useSelectedSong();
    const { data: songsData } = useQuery<Song[], Error>({
        queryKey: ['songs'],
        queryFn: getSongs,
    });

    useEffect(() => {
        if (songsData) {
            setSongs(songsData);
        }
    }, [songsData]);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
            });
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', updateTime);
            }
        };
    }, []);

    useEffect(() => {
        if (songs.length > 0) {
            setCurrentSongIndex(0);
        }
    }, [songs]);

    const updateTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = parseFloat(e.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const playNextSong = () => {
        if (currentSongIndex < songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
            setSelectedSong(songs[currentSongIndex + 1])
        } else {
            setCurrentSongIndex(0);
            setSelectedSong(songs[0])
        }
    };

    const playPreviousSong = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
            setSelectedSong(songs[currentSongIndex - 1])
        } else {
            setCurrentSongIndex(songs.length);
            setSelectedSong(songs[currentSongIndex])
        }
    };


    return (
        <div className="w-full mt-4 text-white rounded-lg relative pb-6">
            <div className="mb-2">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-gray-600 rounded-lg"
                        />
                        <div className="flex justify-between text-xs mt-2 text-gray-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} src={selectedSong?.url} preload="metadata" />
            <div className="flex justify-between">
                <button className="text-2xl">
                    <img src={images.menu} alt="menu" />
                </button>
                <div className="flex items-center justify-center gap-4">
                    <button className="text-2xl  transition-all duration-300 ease-in-out hover:scale-110 active:scale-100 hover:bg-gray-200/10 p-2 rounded-full" onClick={playPreviousSong}>
                        <img src={images.prev} alt="previous" />
                    </button>

                    <button className="text-2xl  transition-all duration-300 ease-in-out  hover:scale-105 active:scale-100" onClick={togglePlay}>
                        <img src={isPlaying ? images.pause : images.play} alt="play/pause" />
                    </button>

                    <button className="text-2xl  transition-all duration-300 ease-in-out  hover:scale-110 active:scale-100 hover:bg-gray-200/10 p-2 rounded-full" onClick={playNextSong}>
                        <img src={images.next} alt="next" />
                    </button>
                </div>
                <div className="flex items-center cursor-pointer relative">
                    <img
                        src={images.volume}
                        alt="volume"
                        onClick={() => setShowVolume(!showVolume)}
                    />
                    {showVolume && (
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="h-4 w-20 bg-gray-600 rounded-lg rotate-[-90deg] absolute top-5 right-5 p-2"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
