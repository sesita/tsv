const Banner = ({ text }) => {
    return (
        <>
            <section className='bg-gradient-to-r from-gray-900 via-gray-700 to-black pt-10 pb-20'>
                <div className='mx-auto sm:w-10/12 px-2 sm:px-0'>
                    <h2 className='text-white sm:text-5xl text-3xl font-semibold'>{text}</h2>
                </div>
            </section>
        </>
    )
}

export default Banner
