import React from 'react'
import LoginPage, { Logo, Username, Password,Title,Input} from '@react-login-page/page6'
import {useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast,Bounce,ToastContainer } from 'react-toastify'
import {encode} from 'js-base64'
import env from 'react-dotenv'


const VerifyOTP = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const {email} = location.state || {} // Get the email from the location state

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    axios.post('https://hireme-zjcp.onrender.com/verify-otp', { email:email, otp: data.otp },{auth:{username:env.API_USERNAME,password:env.API_PASSWORD}})
    .then(response => {
      if (response.status === 200){
        localStorage.setItem('__hire_me_app_session_id',encode(email))
        navigate('/seeker', { state: { email:email} });
      }else{
        toast.error(response.message,{
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
          theme: "dark",
          transition: Bounce,
        })
      }
    })
  }

  return (
    <>
     <div className='bg-dotted-spacing-10 bg-black bg-dotted-white h-screen'>
         <div className="bg-radial-corners font-outfit h-full from-black to-transparent flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <LoginPage style={{'--login-bg': '#00000'}} className='scale-110'>
                <Logo visible={false}></Logo>
                <Title>Enter OTP</Title>
                    <Username visible={false}></Username>
                    <Input placeholder='OTP Please' name='otp' required></Input>
                    <Password visible={false}></Password>
                </LoginPage>
          </form>
         </div>
     </div>
     <ToastContainer autoClose={3000} />
    </>
  )
}

export default VerifyOTP