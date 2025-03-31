import React from 'react'
import LoginPage, { Logo, Footer, Username, Password,Title} from '@react-login-page/page6'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast,Bounce,ToastContainer } from 'react-toastify'

const SignUp = () => {

  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  try{
  const response = await axios.post('http://localhost:5000/signup/seeker', data)
    if(response.status === 201){
      await axios.post('http://localhost:5000/send-code', data)
      .then((response) => {
        if (response.status === 200) {
          toast.success("OTP Sent to your email",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "dark",
            transition: Bounce,
          })
          navigate('/verifyotp', { state: { email: data.email } });
        }else {
        toast.error("An error occurred. Please try again later!",{
          position: "top-right",
          autoClose: 5000,
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
  }catch(error) {
    if(error.response){
      if(error.response.status === 400){
        toast.error("User Already Exists. Please Login",{
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        })
    }else{
      toast.error("An error occurred. Please Try Again Later!",{
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 10,
        theme: "dark",
        transition: Bounce,
      })
    }
    }else{
    console.error('There was an error!', error);
    toast.error("An error occurred. Please Try Again Later!",{
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
  }
}

  return (
    <>
     <div className='bg-dotted-spacing-10 bg-black bg-dotted-white h-screen'>
         <div className="bg-radial-corners font-outfit h-full from-black to-transparent flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <LoginPage style={{'--login-bg': '#00000'}} className='scale-110'>
                <Logo visible={false}></Logo>
                <Title>Welcome</Title>
                <Username placeholder='Full Name' index={0} keyname='name' required label='FullName'></Username>
                <Username placeholder='Email' index={0} keyname='email' required label='Email ID'></Username>
                <Username placeholder='Username' index={0} keyname='username' required label='Username' visible={false}></Username>
                <Username placeholder='Mobile Number' keyname='phoneNumber' index={1} required label='Mobile Number (+91)'></Username>
                <Password placeholder='Password' visible={false} keyname='password' required></Password>
                <Footer>Existing User? <a href='/login' style={{color:"white"}} className='text-white hover:text-blue-700'>SignIn Here</a></Footer>
                </LoginPage>
          </form>
         </div>
     </div>
     <ToastContainer autoClose={3000}/>
    </>
  )
}

export default SignUp