// SelectedSongContext.tsx

import { ReactNode, createContext, useContext, useState } from 'react';
import { Song } from '../types';

type SelectedSongContextType = {
    selectedSong: Song | null;
    setSelectedSong: (song: Song | null) => void;
};

const SelectedSongContext = createContext<SelectedSongContextType | undefined>(undefined);

export const useSelectedSong = () => {
    const context = useContext(SelectedSongContext);
    if (!context) {
        throw new Error('useSelectedSong must be used within a SelectedSongProvider');
    }
    return context;
};

export const SelectedSongProvider = ({ children }: { children: ReactNode }) => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    const contextValue: SelectedSongContextType = {
        selectedSong,
        setSelectedSong,
    };

    return (
        <SelectedSongContext.Provider value={contextValue}>
            {children}
        </SelectedSongContext.Provider>
    );
};
