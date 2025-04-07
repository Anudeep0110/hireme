import React ,{useEffect} from 'react'
import Loader from './Loader'
import Error from './Error'
import NavbarComp from './NavbarComp'
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { decode } from 'js-base64'
import HomeIcon from '../Assets/home_icon.png'
import ApplicationIcon from '../Assets/application_icon.png'
import ConnectionsIcon from '../Assets/connection_icon.png'
import ProfileIcon from '../Assets/profile_icon.png'
import LocationIcon from '../Assets/location_icon.png'
import BirthIcon from '../Assets/birth_icon.png'
import GenderIcon from '../Assets/gender_icon.png'
import PhoneIcon from '../Assets/phone_icon.png'
import MailIcon from '../Assets/mail_icon.png'
import LinkedInIcon from '../Assets/linkedin_icon.png'
import EditIcon from '../Assets/edit_icon.png'



const Seeker = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [email,setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [errorPage,setErrorPage] = React.useState(false)
    const [user,setUser] = React.useState({})

    useEffect(() => {
        const email = location.state?.email || decode(localStorage.getItem('__hire_me_app_session_id'));
        console.log(email);
        if (email) {
            setEmail(email)
            axios.get('https://hireme-zjcp.onrender.com/getseekers',
                {
                    email:email
                },
                {
                    auth: {
                        username: 'admin',
                        password: 'anudeepgude765'
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(response => {
                if(response.status === 200){
                    setLoading(false)
                    setUser(response.data.data[0])
                }else{
                    setLoading(false)
                    setErrorPage(true)
                }
            })
            
        } else {
            setLoading(false)
            setErrorPage(true)
        }
    },[email,location.state])

    if (localStorage.getItem('__hire_me_app_session_id') === null) {
        navigate('/login')
    }
  return (
    <>
        {loading ? <Loader msg='Loading User Data...'/> : (errorPage ? <Error /> : <User user = {user}/>)}
    </>
  )
}

export default Seeker


const User = ({user}) => {

    const education = [
        {degree: 'B.E/B.Tech', college: 'Anil Neerukonda Institute of Technology and Sciences', year: '2021-2025'},
        {degree: 'Intermediate', college: 'Sri Chaitanya Junior College', year: '2019-2021'},
        {degree: 'Secondary School', college: 'Sri Chaitanya High School', year: '2019'}
    ]

    const projects = [
        {title: 'Project 1', description: 'This is a project description', year: '2023'},
        {title: 'Project 2', description: 'This is a project description', year: '2022'},
        {title: 'Project 3', description: 'This is a project description', year: '2021'}
    ]
    // const skills = [
    //     {skill: 'JavaScript', rating: 4},
    //     {skill: 'React', rating: 5},
    //     {skill: 'Node.js', rating: 3},
    //     {skill: 'Python', rating: 4},
    //     {skill: 'Java', rating: 2}
    // ]
    
    return (
        <>
            <div className='bg-black h-full bg-dotted-spacing-10 bg-dotted-white'>
                <div className="bg-radial-corners font-outfit text-center h-full from-black to-transparent flex flex-col justify-start items-start">
                    <NavbarComp />
                    <div className='h-full w-full flex border'>
                        <div className='w-[300px] mx-4 h-full py-8 md:flex-col gap-4 md:flex hidden ms-3'>
                            <div className='glassmorphism-25 rounded border flex flex-col gap-4 justify-center py-6 items-center'>
                                <img alt='Profile' src={ProfileIcon} className='w-16 rounded-full'></img>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-medium font-outfit text-white text-2xl'>{user.name}</p>
                                    <p className='font-normal font-outfit text-white text-md'>{user.email}</p>
                                    <p className='font-normal font-outfit text-white text-md'>{user.phoneNumber}</p>
                                </div>
                            </div>
                            <span className=' bg-gray-400 px-4 py-2 hover:scale-110 hover:border glassmorphism-25 cursor-pointer rounded  flex items-center gap-2'>
                                <img alt='Dashboard' src={HomeIcon} className='w-8'></img>
                                <p className='font-outfit text-xl font-thin hover:font-normal text-white'>Dashboard</p>
                            </span>
                            <span className=' bg-gray-400 px-4 py-2 glassmorphism-25 hover:scale-110 hover:border cursor-pointer rounded  flex items-center gap-2'>
                                <img alt='Dashboard' src={ApplicationIcon} className='w-8'></img>
                                <p className='font-outfit text-xl font-thin hover:font-normal text-white'>My Applications</p>
                            </span>
                            <span className=' bg-gray-400 px-4 py-2 glassmorphism-25 hover:scale-110 hover:border cursor-pointer rounded  flex items-center gap-2'>
                                <img alt='Dashboard' src={ConnectionsIcon} className='w-8'></img>
                                <p className='font-outfit text-xl font-thin hover:font-normal text-white'>My Connections</p>
                            </span>
                        </div>
                        <div className='fex-1 rounded-md gap-8 me-8 px-12 py-8 w-full overflow-y-scroll flex flex-col'>
                            <div className='flex flex-col border gap-6 justify-start items-start mx-40 py-8 px-24 bg-[rgba(255,255,255,.2)] rounded-xl backdrop-blur-sm'>
                                <div className='flex'>
                                    <img src={ProfileIcon} alt='Profile' className='w-28 rounded-full border'></img>
                                    <div className='flex px-10 py-2 justify-center gap-1 items-start text-white flex-col h-full'>
                                        <p className='font-outfit font-semibold text-2xl'>{user.name}</p>
                                        <p className='font-outfit font-normal text-lg'>B.E/B.Tech</p>
                                        <p className='font-outfit font-thin text-md'>Anil Neerukonda Institute of Technology and Sciences</p>
                                    </div>
                                </div>
                                <div className='w-full flex-wrap flex justify-start items-start'>
                                    <span className='flex w-1/3 justify-start gap-2 py-2 px-4'>
                                        <img src={LocationIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>Visakhapatnam</p>
                                    </span>
                                    <span className='flex w-1/3 gap-2 py-2 px-4'>
                                        <img src={BirthIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>2003-05-25</p>
                                    </span>
                                    <span className='flex w-1/3 gap-2 py-2 px-4'>
                                        <img src={GenderIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>Male</p>
                                    </span>
                                    <span className='flex w-1/3 gap-2 py-2 px-4'>
                                        <img src={MailIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>{user.email}</p>
                                    </span>
                                    <span className='flex w-1/3 gap-2 py-2 px-4'>
                                        <img src={PhoneIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>{user.phoneNumber}</p>
                                    </span>
                                    <span className='flex w-1/3 gap-2 py-2 px-4'>
                                        <img src={LinkedInIcon} alt='Location' className='w-5'></img>
                                        <p className='font-outfit text-md text-white'>Anudeep Gude</p>
                                    </span>
                                </div>
                            </div>
                            <div className='border mx-40 px-12 py-8 bg-[rgba(255,255,255,.2)] rounded-xl backdrop-blur-sm flex flex-col gap-6'>
                                <h2 className='text-3xl font-outfit font-normal text-white text-start w-full'>Job Preferences</h2>
                                <div className='flex flex-wrap py-2 px-10'>
                                    <span className='flex w-1/3 flex-col items-start justify-start gap-2 py-2 px-4'>
                                        <p className='text-green-400 font-outfit text-lg font-light '>Preferred Job Type</p>
                                        <p className='font-outfit text-md text-white'>Full Time</p>
                                    </span>
                                    <span className='flex w-1/3 flex-col items-start justify-start gap-2 py-2 px-4'>
                                        <p className='text-green-400 font-outfit text-lg font-light '>Work Availability</p>
                                        <p className='font-outfit text-md text-white'>Flexible</p>
                                    </span>
                                    <span className='flex w-1/3 flex-col items-start justify-start gap-2 py-2 px-4'>
                                        <p className='text-green-400 font-outfit text-lg font-light '>Preferred Work Location</p>
                                        <p className='font-outfit text-md text-white'>Visakhapatnam</p>
                                    </span>
                                </div>
                            </div>
                            <div className='border mx-40 px-12 py-8 bg-[rgba(255,255,255,.2)] rounded-xl backdrop-blur-sm flex flex-col gap-6'>
                                <h2 className='text-3xl font-outfit font-normal text-white text-start w-full'>About Me</h2>
                                <p className='text-lg font-outfit text-justify text-white font-extralight'>The rapid advancement of technology has drastically changed the way we live and work. With the rise of artificial intelligence, automation, and machine learning, industries are evolving at an unprecedented pace. While these innovations bring about increased efficiency and convenience, they also present new challenges and ethical considerations. As we continue to integrate technology into our daily lives, it is crucial to strike a balance between progress and responsibility, ensuring that these developments benefit society as a whole. The future will undoubtedly be shaped by the decisions we make today in navigating these changes.</p>
                            </div>
                            <div className='border mx-40 px-12 py-8 bg-[rgba(255,255,255,.2)] rounded-xl backdrop-blur-sm flex flex-col gap-6'>
                                <h2 className='text-3xl font-outfit font-normal text-white text-start w-full'>Education</h2>
                                <div className='flex flex-col py-2 justify-start items-start'>
                                    {education.map((edu,index) => {
                                        return (
                                            <div key={index} className='flex flex-col items-start w-full gap-2 py-2 px-4'>
                                                <div className='flex justify-between w-full'>
                                                    <p className='text-green-400 flex gap-2 items-center font-outfit text-lg font-light'>{edu.college} <img src={EditIcon} alt='Edit'className='w-5 h-5 cursor-pointer'></img></p>
                                                    <p className='text-white font-outfit text-lg font-light'>{edu.year}</p>
                                                </div>
                                                <p className='font-outfit text-md text-white'>{edu.degree}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='border mx-40 px-12 py-8 bg-[rgba(255,255,255,.2)] rounded-xl backdrop-blur-sm flex flex-col gap-6'>
                                <h2 className='text-3xl font-outfit font-normal text-white text-start w-full'>Projects</h2>
                                <div className='flex flex-col py-2 justify-start items-start'>
                                    {projects.map((proj,index) => {
                                        return (
                                            <div key={index} className='flex flex-col items-start w-full gap-2 py-2 px-4'>
                                                <div className='flex justify-between w-full'>
                                                    <p className='text-green-400 flex gap-2 items-center font-outfit text-lg font-light'>{proj.title} <img src={EditIcon} alt='Edit'className='w-5 h-5 cursor-pointer'></img></p>
                                                    <p className='text-white font-outfit text-lg font-light'>{proj.year}</p>
                                                </div>
                                                <p className='font-outfit text-md text-white'>{proj.description}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>                  
                    </div>
                </div>
            </div>
        </>
    )
}