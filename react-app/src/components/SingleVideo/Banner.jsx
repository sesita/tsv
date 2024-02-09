const Banner = ({ text }) => {
    return (
        <>
            <section className='bg-gradient-to-r from-gray-900 via-gray-700 to-black pt-10 pb-20'>
                <div className='container mx-auto md:px-0 px-2'>
                    <h2 className='text-white text-5xl font-semibold'>{text}</h2>
                </div>
            </section>
        </>
    )
}

export default Banner
