import React from 'react'
import NavbarComp from './NavbarComp';
import Footer from './Footer';
import { motion } from 'motion/react'
import SearchIcon from '../Assets/search_icon.png'
import LawIcon from '../Assets/law_icon.png'
import VideoIcon from '../Assets/video_icon.png'
import AWSIcon from '../Assets/aws_icon.png'
import ResumeIcon from '../Assets/resume_icon.png'
import HireIcon from '../Assets/hire_icon.png'
import AIIcon from '../Assets/ai_icon.png'
import JobIcon from '../Assets/job_icon.png'
import InterviewIcon from '../Assets/interview_icon.png'
import { Fade, Slide, AttentionSeeker } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [search,setSearch] = React.useState('')
  const searchRef = React.useRef(null)
  const navigate = useNavigate()


  const clickOption = (e) => {
    e.preventDefault();
    setSearch(e.target.innerText)
    searchRef.current?.focus()
  }

  const searchJob = (e) => {
    e.preventDefault();
    if(e.key === 'Enter'){
        navigate('/jobs', { state: { search: search } })
        setSearch('')
    }
  }
  return (
    <>
        <div className='bg-black flex justify-center items-start m-0 overflow-hidden'>
            <div className='bg-dotted-spacing-10 w-full h-fit bg-black bg-dotted-white'>
                <div className="bg-radial-corners from-black to-transparent flex-col justify-center items-start">
                  <NavbarComp />
                  <div className='flex-col text-white md:py-32 py-16 text-center items-center'>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit = {{ opacity: 0 }}
                      transition={{ duration: 3,type:'spring',bounce:0.25,delay:0 }}
                      className='md:text-[60px] text-[40px] font-outfit font-bold'>Where <span className='text-green-700 text-[55px] md:text-[65px]'>Talent </span> meets <span className='text-green-700 text-[55px] md:text-[65px]'>Oppurtunity </span></motion.p>
                      <AttentionSeeker  effect='shakeX' duration={800} delay={0}>
                      <div className='md:px-40 flex py-4 md:mt-16 items-center  md:mx-40'>
                          <input ref={searchRef} className='bg-black mx-auto justify-self-center text-white text-2xl md:w-[800px] font-outfit border-2 rounded-full p-4 px-8 font-medium' value={search} placeholder='Search for Jobs' onKeyDown={searchJob}></input>
                      </div>
                      </AttentionSeeker>
                      <div className='flex flex-wrap mt-2 mb-10 justify-center font-outfit gap-3 text-lg text-gray-300 font-normal'>
                        <span onClick={clickOption} className='bg-black border px-3 rounded-full cursor-pointer hover:border-green-400 hover:text-green-700'>Full Stack Developer</span>
                        <span onClick={clickOption} className='bg-black border px-3 rounded-full cursor-pointer hover:border-green-400 hover:text-green-700'>Techincal Analyst</span>
                        <span onClick={clickOption} className='bg-black border px-3 rounded-full cursor-pointer hover:border-green-400 hover:text-green-700'>Software Engineer</span>
                        <span onClick={clickOption} className='bg-black border px-3 rounded-full cursor-pointer hover:border-green-400 hover:text-green-700'>Python Developer</span>
                        <span onClick={clickOption} className='bg-black border px-3 rounded-full cursor-pointer hover:border-green-400 hover:text-green-700'>UI/UX Designer</span>
                      </div>
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
                    <div className='py-12 my-12 xl:px-96 px-8'>
                      <Fade duration={3000} cascade damping={1}>
                        <p className='font-outfit md:text-[50px] text-4xl mb-12 font-semibold'>Why Choose Hire Me?</p>
                      </Fade>
                      <Slide direction='left' duration={2000}>
                        <div className='md:w-96 w-88 me-auto mt-8 rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={SearchIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>AI Resume Matching</p>
                            <p className='font-outfit pt-2 text-xl '>Our NLP engine extracts skills and ranks candidates with 95% accuracy.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1} delay={2000}>
                        <svg className='w-full' viewBox="0 -10 2000 400" >
                          <path d='M350,-10 C1000,1000 800,-700 1700,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='0' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1680' cy='380' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg> 
                      </Fade>
                      <Slide direction='right' duration={2000}>
                        <div className='md:w-96 w-88 ms-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={LawIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>Bias-Free Hiring</p>
                            <p className='font-outfit pt-2 text-xl '>Automatically detect and remove gendered language from job posts.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1}  delay={2000}>
                        <svg className='w-full' viewBox="0 0 2000 400" >
                          <path d='M1700,0 C1000,1000 800,-700 350,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='390' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1690' cy='10' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg>
                      </Fade>
                      <Slide direction='left' duration={2000}>
                        <div className='md:w-96 w-88 me-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={VideoIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>Video Interview Insights</p>
                            <p className='font-outfit pt-2 text-xl '>Real-time emotion analysis and answer grading during interviews.</p>
                        </div>
                      </Slide>
                      <Fade duration={1000} cascade damping={1}  delay={2000}>
                        <svg className='w-full' viewBox="0 -10 2000 400" >
                          <path d='M350,-10 C1000,1000 800,-700 1700,400' stroke='white' stroke-width="2"></path>
                          <circle cx='350' cy='0' r='15' fill='black' stroke='green' stroke-width='5'></circle>
                          <circle cx='1680' cy='380' r='15' fill='black' stroke='green' stroke-width='5' ></circle>
                        </svg> 
                      </Fade>
                      <Slide direction='right' duration={2000}>
                        <div className='md:w-96 w-88 ms-auto rounded-2xl hover:shadow-[0_0_15px_#16a34a] transition-all duration-300 flex-col text-gray-500 group hover:text-white justify-center text-center items-center bg-black border hover:border-green-600 px-12 py-8'>
                            <img src={AWSIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                            <p className='font-outfit pb-2 text-2xl '>AWS-Powered Security</p>
                            <p className='font-outfit pt-2 text-xl '>Your data is encrypted and stored securely on AWS cloud..</p>
                        </div>
                      </Slide>
                    </div>
                    <div className='py-12 my-12 md:px-40 '>
                      <Fade duration={3000} cascade damping={1}>
                        <p className='font-outfit md:text-[50px] text-4xl mb-12 font-semibold'>How It Works?</p>
                      </Fade>
                      <Fade cascade damping={1} duration={3000}>
                      <div className='flex-col flex md:flex-row font-outfit justify-center items-center gap-10 md:gap-20 md:py-10'>
                          <div className='flex-1 text-white py-10 px-20'>
                              <p className='font-outfit text-4xl font-semibold mb-10'>For Job Seekers</p>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 me-auto'>
                                  <img src={ResumeIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>Upload Resume</p>
                              </div>
                              <svg className='w-full' viewBox="0 0 1500 200" >
                                <path d='M300,0 L300,50 Q300,100,350,100 L350,100 L1150,100 Q1200,100,1200,150 L1200,150 1200,200' fill='none' stroke='white' strokeWidth={4}></path>
                              </svg>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 ms-auto'>
                                  <img src={AIIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>AI Matches Jobs</p>
                              </div>
                              <svg className='w-full' viewBox="0 0 1500 200" >
                                <path d='M1200,0 L1200,50 Q1200,100,1150,100 L1150,100 L350,100 Q300,100,300,150 L300,150 300,200' fill='none' stroke='white' strokeWidth={4}></path>
                              </svg>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 me-auto'>
                                  <img src={InterviewIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>Interview & Get Hired</p>
                              </div>
                          </div>
                          <hr className='border h-full '></hr>
                          <div className='flex-1 text-white py-10 px-20'>
                              <p className='font-outfit text-4xl font-semibold mb-10'>For Recruiters</p>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 ms-auto'>
                                  <img src={JobIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>Post Jobs</p>
                              </div>
                              <svg className='w-full' viewBox="0 0 1500 200" >
                                <path d='M1200,0 L1200,50 Q1200,100,1150,100 L1150,100 L350,100 Q300,100,300,150 L300,150 300,200' fill='none' stroke='white' strokeWidth={4}></path>
                              </svg>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 me-auto'>
                                  <img src={AIIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>AI Screens Candidates</p>
                              </div>
                              <svg className='w-full' viewBox="0 0 1500 200" >
                                <path d='M300,0 L300,50 Q300,100,350,100 L350,100 L1150,100 Q1200,100,1200,150 L1200,150 1200,200' fill='none' stroke='#fff'  strokeWidth={4}></path>
                              </svg>
                              <div className='flex-col group border hover:border-pink-700 hover:shadow-[0_0_15px_#be185d] transition-all duration-300 rounded-2xl p-4 md:w-72 w-88 ms-auto'>
                                  <img src={HireIcon} alt='search icon' className='w-20 h-20 mx-auto scale-50 transition-transform duration-300 ease-in-out group-hover:scale-90'/>
                                  <p className='font-outfit pb-2 text-2xl '>Hire Faster</p>
                              </div>
                          </div>
                      </div>
                    </Fade>
                    </div>
                  </div>
                  <Footer/>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomePage