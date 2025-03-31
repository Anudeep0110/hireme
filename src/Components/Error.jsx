import React from 'react'
import ErrorIcon from '../Assets/error_icon.png'

const Error = () => {
  return (
    <>
        <div className='bg-black h-screen bg-dotted-spacing-16  bg-dotted-green-700'>
        <div className="bg-radial-circle font-outfit text-center h-full from-black to-transparent flex gap-12 flex-col justify-center items-center">
            <img alt='Error' src={ErrorIcon} className='w-48'></img>
            <p className='text-white font-medium md:text-2xl'>Oh! Sorry for that. <br></br>Let us check and get back to you! <br></br>Please refresh the page and try again</p>
        </div>
    </div>
    </>
  )
}

export default Error