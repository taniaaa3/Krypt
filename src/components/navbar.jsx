import React, { useState } from 'react';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import img from '../images/krypt-website-favicon-white.png';

const Navbar = () => {

  const NavbarItems = ({title, classProps})=>{
    return(
      <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
    )
  }

  const[toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="navbar w-full flex md:justify-center justify-between items-center p-4">
        <div className='img-div md:flex-[0.5] flex-initial -justify-center items-center'>
        <img src={img} className='img w-24 cursor-pointer' alt="" />
        
        <h1 className='logo-name'>KRYPT</h1>
        </div>
        <ul className='md:flex hidden flex-initial flex-row justify-between list-none items-center'>
          {['Market','Exchange', 'Tutorial','Wallets'].map((val)=>{
                return(
                  <NavbarItems title={val}/>
                )
          })}
        <li className='login-btn bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>
        </ul>
        <div className="flex relative">
          {toggleMenu 
          ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer'onClick={()=>{setToggleMenu(false)}}/> 
          : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer'onClick={()=>{setToggleMenu(true)}}/>}
          {toggleMenu && (
            <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={()=>{setToggleMenu(false)}}/>
              </li>
              {['Market','Exchange', 'Tutorial','Wallets'].map((val)=>{
                return(
                  <NavbarItems title={val} classProps='my-2 text-lg'/>
                )
          })}
            </ul>
          )}
        </div>
    </nav>
  )
}

export default Navbar