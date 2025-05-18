import React from 'react'
import NavbarComp from './NavbarComp'
import { useLocation } from 'react-router-dom'

const JobsList = () => {

  const location = useLocation()
  const search = location.state?.search || ''

  const [noofJobs, setNoofJobs] = React.useState(8765)
  const [jobs, setJobs] = React.useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Company A',
      location: 'Remote',
      date: '2023-10-01',
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Company B',
      location: 'New York, NY',
      date: '2023-10-02',
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Company C',
      location: 'San Francisco, CA',
      date: '2023-10-03',
    },
    // Add more job objects as needed
  ])

  return (
    <div className='bg-black h-screen bg-dotted-spacing-10 bg-dotted-white'>
        <div className="bg-radial-corners font-outfit text-center h-full from-black to-transparent flex flex-col justify-start items-start">
            <NavbarComp />
            <div className=' w-full px-20 py-10 flex flex-col justify-center items-center gap-10'>
                <div className='md:px-40 flex py-4 items-center  md:mx-40'>
                    <input className='bg-black mx-auto justify-self-center text-white text-2xl md:w-[800px] font-outfit border-2 rounded-full p-4 px-8 font-medium' value={search} placeholder='Search for Jobs'></input>
                </div>
                <p className='md:text-5xl text-lg'>{noofJobs} Total Jobs</p>
                <div className='flex gap-10 w-full'>
                  <div className='border h-full md:w-[400px] bg-[rgba(255,255,255,.2)] backdrop-blur-sm rounded'></div>
                  <div className='flex flex-col gap-4 items-center w-full justify-center p-5 border'>
                      {jobs.map((job) => (
                        <div key={job.id} className='shadow-md bg-[rgba(255,255,255,.2)] backdrop-blur-sm md:w-[70%] p-4 rounded-lg'>
                              <h2 className='text-xl font-bold'>{job.title}</h2>
                              <p className='text-gray-600'>{job.company}</p>
                              <p className='text-gray-600'>{job.location}</p>
                              <p className='text-gray-400'>{job.date}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default JobsList
