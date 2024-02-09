import React from 'react'
import VideoBox from '../Common/VideoBox'
import FilterOptions from '../Common/FilterOptions'

const Videos = ({ searchQuery }) => {
    return (
        <>
            <section className='mb-16 md:px-0 px-3'>
                <div className='mx-auto md:w-[88%] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.25)] pt-8 px-12 rounded-[29px] -mt-24 z-20 bg-white pb-10'>
                    <FilterOptions />
                    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
                        <VideoBox
                            info={{
                                _id: 1,
                                thumbnail: require('../../assets/img/Video1.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 2,
                                thumbnail: require('../../assets/img/Video2.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 3,
                                thumbnail: require('../../assets/img/Video3.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 4,
                                thumbnail: require('../../assets/img/Video4.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 5,
                                thumbnail: require('../../assets/img/Video1.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 6,
                                thumbnail: require('../../assets/img/Video2.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 7,
                                thumbnail: require('../../assets/img/Video3.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                        <VideoBox
                            info={{
                                _id: 8,
                                thumbnail: require('../../assets/img/Video4.png'),
                                title: 'Lorem Ipsum is simply dummy text of the printing.',
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Videos
