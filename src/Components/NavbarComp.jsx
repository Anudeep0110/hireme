import React from 'react'
import {motion,AnimatePresence} from 'motion/react'
import { RxHamburgerMenu } from "react-icons/rx";


const NavbarComp = () => {

    const [showMenu, setShowMenu] = React.useState(false)

  return (
    <>
        <div className='h-auto z-50 w-full flex justify-between items-center md:px-24 px-12 py-8'>
            <div className='text-3xl font-bold text-white'>Hire Me</div>
            <RxHamburgerMenu className='md:hidden block text-3xl text-white' onClick={() => setShowMenu(!showMenu)} />
            <div className='md:flex hidden justify-between md:text-2xl items-center gap-12'>
                <a href='/home'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>Home</p></a>
                <a href='/about'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>About</p></a>
                <a href='/services'><p className='text-white font-semibold hover:text-glow-green-700 hover:text-green-700'>Services</p></a>
            </div>

        </div>
        <AnimatePresence initial = {false}>
            {showMenu && 
                <div className='md:hidden flex flex-col gap-4 w-screen absolute top-16 bg-black p-4 shadow-lg'>
                    <motion.a 
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:.25,delay:0.05}}
                        href='/home' 
                        className='text-white text-xl px-8 font-semibold hover:text-glow-white'>
                        Home
                    </motion.a>
                    <motion.a
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.1}}
                        href='/about' className='text-white text-xl px-8 font-semibold hover:text-glow-white'>About</motion.a>
                    <motion.a 
                        initial = {{x:-200}}
                        animate = {{x:0}}
                        exit = {{x:-200}}
                        transition = {{duration:0.5,type:'spring',bounce:0.25,delay:0.15}}
                        href='/services' className='text-white text-xl px-8 font-semibold hover:text-glow-white'>Services</motion.a>
                </div>}
            </AnimatePresence>
    </>
  )
}

export default NavbarComp