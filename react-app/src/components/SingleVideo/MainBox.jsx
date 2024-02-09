import VideoBox from '../Common/VideoBox'
import Comments from './Comments'
import Video from './Video'
import VideoInfo from './VideoInfo'

const MainBox = () => {
    return (
        <>
            <section>
                <div className='container mx-auto md:px-0 px-2'>
                    <div className='rounded-3xl py-8 px-8 shadow-[box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.25)] bg-white -mt-10'>
                        <Video />
                        <div className='flex gap-6 mt-5'>
                            <div className='flex-1'>
                                <VideoInfo />
                                <Comments />
                            </div>
                            <div className='w-full max-w-[300px] flex flex-col gap-5 p-2 rounded'>
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainBox
