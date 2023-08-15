import React from 'react'
import img from '../images/krypt-website-favicon-white.png';

const Footer = () => {
  return (
    <div className='w-full flex md:justify-center justify-between items-center flex-col p-4'>
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={img} alt="logo" className='w-24' />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorials</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">Wallets</p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle.</p>
        <p className="text-white text-sm text-center font-medium mt-2">info@krypt.com</p>
      </div>
      <div className="w-full bg-gray-400 mt-5 sm:w-[90%] h-[0.25px]"/>
      <div className="w-full flex justify-between sm:w-[90%] items-center mt-3">
        <p className="text-white text-xs text-left">@krypt</p>
        <p className="text-white text-xs text-right">All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer