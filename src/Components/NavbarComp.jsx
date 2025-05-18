import React, { useEffect } from 'react'
import {motion,AnimatePresence} from 'motion/react'
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import ProfileIcon from '../Assets/profile_icon.png'


const NavbarComp = () => {

    const [showMenu, setShowMenu] = React.useState(false)

    const [loggedIn, setLoggedIn] = React.useState(false)

    const [loading,setLoading] = React.useState(true)

    const navigate = useNavigate()


    useEffect(() => {
        const sessionId = localStorage.getItem('__hire_me_app_session_id')
        if(sessionId){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        setLoading(false)
    }
    ,[])

    const logout = () => {
        localStorage.removeItem('__hire_me_app_session_id')
        setLoggedIn(false)
        navigate('/home')
    }

    const goToSeekerPage = () => {
        navigate('/seeker')
    }
    
    if(loading){
        return  <Loader />
    }
    
  return (
    <>
        <div className='h-auto z-50 w-full font-outfit flex justify-between items-center md:px-24 px-12 py-8'>
            <div className='text-3xl font-bold text-white me-auto cursor-pointer' onClick={() =>{ navigate('/')}}>Hire Me</div>
            <RxHamburgerMenu className='md:hidden block text-3xl text-white' onClick={() => setShowMenu(!showMenu)} />
            <div className='md:flex ms-auto hidden justify-between md:text-2xl items-center gap-12'>
                <a href='/home'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>Home</p></a>
                {!loggedIn ?<a href='/login'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>Login</p></a>:
                <button onClick={logout}><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>Logout</p></button>}
                <a href='/about'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>About</p></a>
                {loggedIn && <img alt='Profile' onClick={goToSeekerPage} src={ProfileIcon} className='w-10 rounded-full cursor-pointer'></img>}
            </div>

        </div>
        <AnimatePresence initial = {false}>
            {showMenu && 
                <div className='md:hidden flex flex-col w-screen font-outfit gap-4 absolute top-16 bg-black p-4 shadow-lg'>
                    <motion.a 
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:.25,delay:0.05}}
                        href='/home' 
                        className='text-white text-xl px-8 font-semibold hover:text-glow-white'>
                        Home
                    </motion.a>
                    {!loggedIn?<motion.a
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.1}}
                        href='/login' className='text-white text-xl px-8 font-semibold hover:text-glow-white'>Login</motion.a>:
                    <motion.p
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.1}}
                        onClick={logout} className='text-white text-xl px-8 font-semibold hover:text-glow-white w-auto'>Logout</motion.p>}
                    <motion.a 
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.15}}
                        href='/about' className='text-white text-xl px-8 font-semibold hover:text-glow-white'>About</motion.a>
                    {loggedIn && <motion.img alt='Profile' initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.15}}
                        onClick={goToSeekerPage} src={ProfileIcon} className='w-10 mx-8 rounded-full cursor-pointer'></motion.img>}
                </div>}
            </AnimatePresence>
    </>
  )
}

export default NavbarComp