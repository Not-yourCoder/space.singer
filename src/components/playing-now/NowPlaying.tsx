import React from 'react';
import { useSelectedSong } from '../../context/selectedSongContext';
import AudioPlayer from '../audio/AudioControls';

type Props = {
    className?: string;
};

const NowPlaying: React.FC<Props> = ({ className }) => {
    const { selectedSong } = useSelectedSong();

    if (!selectedSong) {
        return <div className={`${className} p-4 mx-auto`}></div>;
    }

    return (
        <div className={`${className} p-4 mx-auto text-white `}>
            <div className='text-4xl  font-bold mt-8'>{selectedSong.name}</div>
            <div className='text-lg font-light mt-2'>{selectedSong.artist}</div>
            <div className='mt-4'>
                <img src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt="Selected song cover" className=" rounded-md aspect-square w-[34rem]" />
            </div>
            <AudioPlayer />
            {selectedSong &&
                <div className='w-[125px] mx-auto '>
                    <span className='block text-center py-2 bg-gray-400/20 rounded-full '>Now Playing</span>
                </div>
            }

        </div>
    );
};

export default NowPlaying;
