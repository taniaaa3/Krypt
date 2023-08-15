import React from 'react';
import { useEffect } from 'react'
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { ImSpinner9 } from 'react-icons/im';
const {ethereum} = window;



const Home = ({connectWallet, sendtx , checkIfTransactionExists, isLoader, accounts, shortAddress, setAccounts, setShortAddress, formData, setFormData, handleChange}) => {
    const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';
    
    const {addressTo, amount, gif, message} = formData;


    useEffect(() => {
        if (ethereum === undefined) {
            document.querySelector('.connect-wallet').innerHTML = 'Please Install Metamask';
        }
        else {
            ethereum.on('accountsChanged', async () => {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setAccounts(accounts[0]);
                setShortAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(36, 42)}`);

            })
        }
        checkIfTransactionExists();
    }
    )








    
    
    const submit = ()=>{
        console.log(formData);
        if(!addressTo || !amount || !gif || !message) alert('Please fill all the details.');
        else(sendtx());
    }
    
    











    return (
        <div className='flex w-full justify-center items-center'>
            <div className='flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 justify-start items-start flex-col md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-gradient py-1'>Send Crypto <br /> across the world!</h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>Explore the crypto world. Buy and sell cryptocurrencies easily on KRYPT.</p>
                    <button className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] font-semibold connect-wallet' onClick={() => { connectWallet() }}>Connect Wallet</button>
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>Security</div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={commonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
                    <div className="p-3 flex justify-end items-start flex-col h-40 rounded-xl sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    {/* <img width="50" height="50" src="https://img.icons8.com/ios/50/000000/ethereum.png" alt="ethereum"/> */}
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>
                                {/* <img width="25" height="25" color='black' src={img} alt="info" /> */}
                                <BsInfoCircle fontSize={17} color='#fff' />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortAddress}
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>

                    </div>
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <input type="text" required placeholder='Address To' name='addressTo' onChange={(e)=>{handleChange(e.target.value,'addressTo')}} className='addressTo my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
                        <input type="number" required placeholder='Amount (ETH)' name='amount' onChange={(e)=>{handleChange(e.target.value,'amount')}} className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
                        <input type="text" required placeholder='Keyword (Gif)' name='gif' onChange={(e)=>{handleChange(e.target.value,'gif')}} className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
                        <input type="text" required placeholder='Enter Message' name='message' onChange={(e)=>{handleChange(e.target.value,'message')}} className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
                        <div className='h-[1px] w-full bg-gray-400 my-2' />
                        {
                            isLoader ? <ImSpinner9 fontSize={70} className='animation rotate' />
                                : <button type='submit' onClick={() => {submit()}} className='text-white w-full mt-2 border-[1px] p-2 border-[#3df47c] rounded-full cursor-pointer'>Send Now</button>}
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home