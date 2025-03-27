import React from 'react'
import NavbarComp from './NavbarComp';
import { motion } from 'motion/react'
import SearchIcon from '../Assets/search_icon.png'
import LawIcon from '../Assets/law_icon.png'
import VideoIcon from '../Assets/video_icon.png'
import AWSIcon from '../Assets/aws_icon.png'
import { Fade, Slide } from 'react-awesome-reveal';

const HomePage = () => {
  return (
    <>
        <div className='bg-black w-full flex justify-center items-start m-0 overflow-hidden'>
            <div className='bg-dotted-spacing-10 w-full h-fit bg-black bg-dotted-white'>
                <div className="bg-radial-corners from-black to-transparent flex-col justify-center items-start">
                  <NavbarComp />
                  <div className='flex-col text-white py-32 text-center items-center'>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit = {{ opacity: 0 }}
                      transition={{ duration: 3,type:'spring',bounce:0.25,delay:0 }}
                      className='md:text-[60px] text-[40px] font-outfit font-bold'>Where <span className='text-green-700 text-[55px] md:text-[65px]'>Talent </span> meets <span className='text-green-700 text-[55px] md:text-[65px]'>Oppurtunity </span></motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit = {{ opacity: 0 }}
                      transition={{ duration: 3.25,type:'spring',bounce:0.25,delay:0.25 }}
                      className='text-green-700 text-[55px] md:text-[170px] font-outfit font-bold'>Hire ME</motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit = {{ opacity: 0 }}
                      transition={{ duration: 3.5,type:'spring',bounce:0.25,delay:0.5 }}
                      className='md:text-[60px] text-[40px] font-outfit font-bold'>The Future of Hiring is Here <span className='text-green-700 md:text-[30px] text-[20px]'> - Powered by AI</span></motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit = {{ opacity: 0 }}
                      transition={{ duration: 3.75,type:'spring',bounce:0.25,delay:0.75 }}
                      className=' md:text-[25px] text-[15px] font-outfit font-normal py-4'>For Job Seekers: Discover roles tailored to your skills.<br className='inline-block md:hidden'></br> <span className='w-[1px] py-3 md:inline-block hidden bg-white border mx-4'></span>For Employers: Find the perfect candidate in minutes.</motion.p>
                    <div className='flex-col flex md:flex-row font-outfit justify-center items-center gap-10 md:gap-20 md:py-10'>
                      <motion.a 
                        initial={{ x: -100,opacity:0 }}
                        animate={{ x: 0,opacity:1 }}
                        exit = {{ x: -100,opacity:0 }}
                        transition={{ duration: 4,type:'spring',bounce:0.25,delay:1 }}
                      href={'/jobs'}><button className='px-6 py-4 w-52 text-white bg-green-700 rounded-md shadow-lg shadow-green-700'>Find Your Dream Job</button></motion.a>
                      <motion.a 
                        initial={{ x: 100,opacity:0 }}
                        animate={{ x: 0,opacity:1 }}
                        exit = {{ x: 100,opacity:0 }}
                        transition={{ duration: 3.75,type:'spring',bounce:0.25,delay:1 }}
                        href={'/jobs'}><button className='px-6 py-4 w-52 text-white bg-green-700 rounded-md shadow-lg shadow-green-700'>Post a Job</button></motion.a>
                    </div>
                    <div className='py-12 my-12 px-96'>
                      <Fade duration={3000} cascade damping={1}>
                        <p className='font-outfit md:text-[50px] mb-12 font-semibold'>Why Choose Hire Me?</p>
                      </Fade>
                      <Slide direction='left' duration={3000}>
                        <div className='w-96 me-auto mt-8 rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={SearchIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>AI Resume Matching</p>
                            <p className='font-outfit pt-2 text-xl '>Our NLP engine extracts skills and ranks candidates with 95% accuracy.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1} delay={3000}>
                        <svg className='w-full' viewBox="0 -10 2000 400" >
                          <path d='M350,-10 C1000,1000 800,-700 1700,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='0' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1680' cy='380' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg> 
                      </Fade>
                      <Slide direction='right' duration={3000}>
                        <div className='w-96 ms-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={LawIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>Bias-Free Hiring</p>
                            <p className='font-outfit pt-2 text-xl '>Automatically detect and remove gendered language from job posts.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1}  delay={3000}>
                        <svg className='w-full' viewBox="0 0 2000 400" >
                          <path d='M1700,0 C1000,1000 800,-700 350,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='390' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1690' cy='10' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg>
                      </Fade>
                      <Slide direction='left' duration={3000}>
                        <div className='w-96 me-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={VideoIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>Video Interview Insights</p>
                            <p className='font-outfit pt-2 text-xl '>Real-time emotion analysis and answer grading during interviews.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1}  delay={3000}>
                        <svg className='w-full' viewBox="0 -10 2000 400" >
                          <path d='M350,-10 C1000,1000 800,-700 1700,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='0' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1680' cy='380' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg> 
                      </Fade>
                      <Slide direction='right' duration={3000}>
                        <div className='w-96 ms-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={AWSIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>AWS-Powered Security</p>
                            <p className='font-outfit pt-2 text-xl '>Your data is encrypted and stored securely on AWS cloud..</p>
                        </div>
                      </Slide>
                    </div>
                    <div className='py-12 my-12 px-96'>
                      <Fade duration={3000} cascade damping={1}>
                        <p className='font-outfit md:text-[50px] mb-12 font-semibold'>How It Works?</p>
                      </Fade>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomePage