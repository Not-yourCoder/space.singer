import React from 'react';
import { images } from '../../constants/images';
import { useQuery } from '@tanstack/react-query';
import { Song } from '../../types';
import { getSongs } from '../../modules/query-hook';

type Props = {
    className?: string;
};

const Search: React.FC<Props> = ({ className }) => {
    const { data: songs } = useQuery<Song[], Error>({
        queryKey: ['songs'],
        queryFn: getSongs,
    });

    const [searchInput, setSearchInput] = React.useState<string>('');
    const [filteredResults, setFilteredResults] = React.useState<Song[]>([]);

    const handleSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }, []);

    React.useEffect(() => {
        if (searchInput && songs) {
            const filteredSongs = songs.filter(item =>
                item.name.toLowerCase().startsWith(searchInput.toLowerCase())
            );
            setFilteredResults(filteredSongs);
        } else {
            setFilteredResults([]);
        }
    }, [songs, searchInput]);

    return (
        <div className={`flex justify-between items-center ${className} w-full text-white my-6 shadow-lg bg-gray-600/20 rounded-md relative`}>
            <input
                type="text"
                onChange={handleSearch}
                value={searchInput}
                placeholder='Search Artist, Songs'
                className='flex-1 p-3 bg-transparent rounded-t-md rounded-b-md placeholder:text-gray-400 placeholder:text-lg focus:outline-none'
            />
            <img src={images.search} alt="Search" className='mr-2 text-gray-400 hover:cursor-pointer' />
            {searchInput && (
                <ul className="mt-2  backdrop-blur-2xl z-50 rounded-md absolute top-11 w-full p-4">
                    {filteredResults.map((item, index) => (
                        <li key={index} className="py-1">
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
