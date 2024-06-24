import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSongs } from '../query-hook';
import { Song } from '../../types';
import { useSelectedSong } from '../../context/selectedSongContext';
import { MoonLoader } from 'react-spinners';
import ErrorPage from '../../components/error/ErrorPage';

type Props = {
    className?: string;
    tab: number;
};

const SongList: React.FC<Props> = ({ className, tab }) => {
    const { setSelectedSong } = useSelectedSong();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [durations, setDurations] = useState<{ [key: number]: number }>({});
    const { isLoading, isError, data: songs, error } = useQuery<Song[], Error>({
        queryKey: ['songs'],
        queryFn: getSongs,
    });


    useEffect(() => {
        if (songs) {
            songs.forEach((song) => {
                const audio = new Audio(song.url);
                audio.addEventListener('loadedmetadata', () => {
                    setDurations((prev) => ({
                        ...prev,
                        [song.id]: audio.duration,
                    }));
                });
            });
        }
    }, [songs]);

    const handleSelected = (song: Song) => {
        setSelectedId(song.id);
        setSelectedSong(song);
    };

    const override: React.CSSProperties = {
        display: "block",
        margin: "0 auto",
    };

    if (isLoading) {
        return <MoonLoader color='fuchsia' cssOverride={override} aria-label="Loading Spinner" />;
    }

    if (isError && error instanceof Error) {
        return <ErrorPage message={error.message} />;
    }

    const topTracks = songs?.filter((song) => song.top_track);

    return (
        <div className={className}>
            {tab === 0 && (
                songs?.map((song) => (
                    <div
                        key={song.id}
                        className={`${selectedId === song.id ? 'bg-gray-600/40' : 'hover:bg-gray-600/10'
                            } cursor-pointer group hover:scale-105 transition-hover duration-200 ease-in-out flex items-center justify-between p-4 rounded-md mb-2`}
                        onClick={() => handleSelected(song)}
                    >
                        <div className="flex gap-4 items-center">
                            <img
                                className="h-14 w-14 rounded-full group-hover:shadow-xd group-hover:scale-110 transition-hover duration-150 ease-in-out"
                                src={`https://cms.samespace.com/assets/${song.cover}`}
                                alt={`${song.name} cover`}
                            />
                            <div className="text-white">
                                <h2 className="text-xl font-normal">{song.name}</h2>
                                <p className="text-xs text-gray-300">{song.artist}</p>
                            </div>
                        </div>
                        <div className="text-white">
                            {durations[song.id] !== undefined
                                ? `${Math.floor(durations[song.id] / 60)}:${Math.floor(durations[song.id] % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : 'Loading...'}
                        </div>
                    </div>
                ))
            )}
            {tab === 1 && (
                topTracks?.map((song) => (
                    <div
                        key={song.id}
                        className={`${selectedId === song.id ? 'bg-gray-600/40' : 'hover:bg-gray-600/10'
                            } cursor-pointer group hover:scale-105 transition-hover duration-200 ease-in-out flex items-center justify-between p-4 rounded-md mb-4`}
                        onClick={() => handleSelected(song)}
                    >
                        <div className="flex gap-4 items-center">
                            <img
                                className="h-14 w-14 rounded-full group-hover:shadow-xd group-hover:scale-110 transition-hover duration-150 ease-in-out"
                                src={`https://cms.samespace.com/assets/${song.cover}`}
                                alt={`${song.name} cover`}
                            />
                            <div className="text-white">
                                <h2 className="text-xl font-normal">{song.name}</h2>
                                <p className="text-xs text-gray-300">{song.artist}</p>
                            </div>
                        </div>
                        <div className="text-white">
                            {durations[song.id] !== undefined
                                ? `${Math.floor(durations[song.id] / 60)}:${Math.floor(durations[song.id] % 60)
                                    .toString()
                                    .padStart(2, '0')}`
                                : 'Loading...'}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SongList;
