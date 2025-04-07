import React from 'react'
import LoginPage, { Logo, Footer, Username, Password,Title, Input} from '@react-login-page/page6'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast,Bounce,ToastContainer } from 'react-toastify'


const SignIn = () => {
  
    const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  await axios.post('https://hireme-zjcp.onrender.com/send-code',data,{auth:{username:'admin',password:'anudeepgude765'}})
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
    }else if(response.status === 404){
      toast.error("User Not Found",{
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
    else {
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
  .catch((error) => {
    console.error('There was an error!', error);
    toast.error("An error occurred. Please try again later!",{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
      transition: Bounce,
    })
  });
}

  return (
    <>
     <div className='bg-dotted-spacing-10 bg-black bg-dotted-white h-screen'>
         <div className="bg-radial-corners font-outfit h-full from-black to-transparent flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <LoginPage style={{'--login-bg': '#00000'}} className='scale-110'>
              <Logo visible={false}></Logo>
              <Title>Welcome Back</Title>
              <Username placeholder='Email' visible={false} name='username' required></Username>
              <Password placeholder='Password' name='password' visible={false} required></Password>
              <Input placeholder='Email' name='email' required ></Input>
              <Footer>New User? <a href='/signup' style={{color:"white"}} className='text-white hover:text-blue-700'>SignUp Here</a></Footer>
            </LoginPage>
          </form>
         </div>
     </div>
     <ToastContainer/>
    </>
  )
}

export default SignIn