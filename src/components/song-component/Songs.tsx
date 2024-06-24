import Search from '../search-box/Search'
import SongList from '../../modules/song-list/SongList'
import React from 'react'

type Props = {
    className: string
}

const Songs = ({ className }: Props) => {
    const [tab, setTab] = React.useState<number>(0)
    return (
        <div className={className}>
            <div className='flex flex-col '>
                <div className=' text-2xl font-bold flex items-center gap-8'>
                    <div onClick={() => setTab(0)} className={` ${tab === 0 ? "text-white" : "text-gray-400/90"} hover:cursor-pointer`}>For You</div>
                    <div onClick={() => setTab(1)} className={` ${tab === 1 ? "text-white" : "text-gray-400"} hover:cursor-pointer`} >Top Tracks</div>
                </div>
                <Search />
                <SongList className='w-full mt-4' tab={tab} />
            </div>
        </div>
    )
}

export default Songs