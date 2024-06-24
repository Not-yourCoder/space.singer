import React, { Suspense } from 'react';
import { images } from '../../constants/images';
import Songs from '../song-component/Songs';
import NowPlaying from '../playing-now/NowPlaying';
import { useSelectedSong } from '../../context/selectedSongContext';
import { ClipLoader } from 'react-spinners';
import useWindowWidth from '../../hook/useWindowWidth';

const Layout: React.FC = () => {
    const { selectedSong } = useSelectedSong();
    const windowWidth = useWindowWidth();

    const backgroundStyle = {
        background: selectedSong ? `linear-gradient(to right, ${selectedSong?.accent}, black)` : "#500724",
    };

    const getLogoColumnClass = () => {
        if (windowWidth < 1300) return 'hidden';
        if (windowWidth < 1600) return 'col-span-4';
        return 'col-span-5';
    };

    const getSongsColumnClass = () => {
        if (windowWidth < 1300) return 'col-span-12';
        if (windowWidth < 1600) return 'col-span-8';
        return 'col-span-7';
    };

    return (
        <div
            className={`${windowWidth < 750 ? "flex flex-col-reverse gap-2 p-3" : "grid grid-cols-12 p-6"} min-h-[100vh]`}
            style={backgroundStyle}
        >
            <div className='col-span-5'>
                <div className='grid grid-cols-12'>
                    <div className={getLogoColumnClass()}>
                        <img src={images.logo} alt="App Logo" />
                    </div>
                    <Suspense fallback={<ClipLoader />}>
                        <Songs className={getSongsColumnClass()} />
                    </Suspense>
                </div>
            </div>
            {selectedSong && <NowPlaying className="col-span-7" />}
        </div>
    );
};

export default Layout;
