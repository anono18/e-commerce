import React from 'react'
import { RiDribbbleFill, RiGithubFill, RiInstagramFill, RiLinkedinFill, RiTwitterXFill, RiYoutubeFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={''} className='text-[#f70202] text-2xl hover:translate-y-1 duration-500'><RiYoutubeFill/></Link>
        <Link to={''} className='text-[#050505] text-2xl hover:translate-y-1 duration-500'><RiTwitterXFill/></Link>
        <Link to={''} className='text-[#f0043f] text-2xl hover:translate-y-1 duration-500'><RiInstagramFill/></Link>
        <Link to={''} className='text-[#3447ee] text-2xl hover:translate-y-1 duration-500'><RiLinkedinFill/></Link>
        <Link to={''} className='text-[#eb8005] text-2xl hover:translate-y-1 duration-500'><RiDribbbleFill/></Link>
        <Link to={''} className='text-[#000000] text-2xl hover:translate-y-1 duration-500'><RiGithubFill/></Link>
    </div>
  )
}

export default SocialIcons