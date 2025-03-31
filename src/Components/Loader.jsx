import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loader = ({msg = ""}) => {
  return (
    <>
        <div className='bg-black h-screen bg-dotted-spacing-16  bg-dotted-green-700'>
            <div className="bg-radial-circle font-outfit h-full from-black to-transparent flex gap-12 flex-col justify-center items-center">
                <HashLoader color="#15803d" size={70} loading={true} />
                <p className='text-green-700 font-semibold md:text-2xl'>{msg}</p>
            </div>
        </div>
    </>
  )
}

export default Loader