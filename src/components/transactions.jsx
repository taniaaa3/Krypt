import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers';

const TransactionCard = ({allTrans,i, trans}) => {

  const{addressFrom, addressTo, gif, message, timestamp, amount} = allTrans;
  const [image, setImage] = useState([]);
  const [keyword, setKeyword] = useState()
  useEffect(()=>{
    const fun = async()=>{
    setKeyword(trans.map((res)=>{return res.gif.replace(/\s+/g,'')}));
    let d = [];
    const fetchGif = async()=>{
      // const promise = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=abe12eo1alkRn0eMnHo7WwkEbQcwiVcq&q=${keyword[i]}&limit=1`);
      const promise = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=abe12eo1alkRn0eMnHo7WwkEbQcwiVcq&q=${keyword[i]}&limit=1offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
      const data = await promise.json();
      if(await data.pagination.total_count == 0){
         d.push('https://media3.giphy.com/media/3ohA2ZD9EkeK2AyfdK/giphy.gif?cid=5a0778cc1zrnu46l687pw04wdr2zzyj9khzg4efpbzzs1q5p&ep=v1_gifs_search&rid=giphy.gif&ct=g');
      }
      else{
        // d.push(data.data[0].images.downsized.url);
        d.push(data.data[0].images.fixed_height.url);
      }
    }
    await fetchGif();
    setImage(d);
  }
  fun()
  },keyword);


  return (
    <div className='bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] min-w-full flex-col p-3 rounded-md hover:shadow-2xl'>
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-3 p-2">
          <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target='_blank' rel='noopener noreferrer'>
            <p className="text-white text-base">From : {`${addressFrom.slice(0, 6)}...${addressFrom.slice(36, 42)}`}</p>
          </a>
          <a href={`https://goerli.etherscan.io/address/${addressTo}`} target='_blank' rel='noopener noreferrer'>
            <p className="text-white text-base">To: {`${addressTo.slice(0, 6)}...${addressTo.slice(36, 42)}`}</p>
          </a>
          <p className="text-base">Amount: {ethers.formatEther(amount)} ETH</p>
          {message && (
            <>
            <br />
            <p className="text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img src={image} alt={gif} className='w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover' />
            <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2x">
              <p className="font-bold text-[#37c7da]">{new Date(Number(timestamp)*1000).toLocaleString()}</p>
            </div>
      </div>

    </div>
  )
}

const Transactions = ({formData, accounts, fetchGif, allTrans, shortAddress})=>{
  return(
    <div className="flex w-full justify-center items-center 2xl:px-20">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {accounts? (
          <h3 className="text-white text-3xl text-center my-2">
              Latest Transactions
          </h3>
        ):(
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions.
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {allTrans.map((val,i)=>{return(
          <TransactionCard formData={formData} trans={allTrans} allTrans={val} i={i} fetchGif={fetchGif} accounts={accounts} shortAddress={shortAddress}/>
          )})}
          </div>
      </div>
    </div>
  )
}

export default Transactions