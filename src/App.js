import './App.css';
import { useEffect, useState } from 'react';
import ABI from './smartContract/abi.json';
import {ethers} from 'ethers';
import Home from './components/home';
import Navbar from './components/navbar';
import Services from './components/services';
import Transactions from './components/transactions.jsx';
import Footer from './components/footer';
const {ethereum} = window;


function App() {

  

  const [accounts, setAccounts] = useState();
  const [shortAddress, setShortAddress] = useState('Address');
  const [isLoader, setIsLoader] = useState(false);
  const [formData, setFormData] = useState({addressTo: '', amount: '', gif: '', message: ''});
  const[transCount, setTransCount] = useState(localStorage.getItem('transactionCount'));
  const {addressTo, amount, gif, message} = formData;
  const[allTrans, setAllTrans] = useState([]);
 

    const contractAddress = '0x33f4f5f0F3411492d98D634E2278005f980a24dd';
    const provider = new ethers.BrowserProvider(ethereum);
    const getContract = new ethers.Contract(contractAddress, ABI, provider);
    
    useEffect(()=>{
      checkIfTransactionExists();
      // allTransactions();
    },[allTrans])
    
    const handleChange = (e,name)=>{
      setFormData((prevData)=>({
        ...prevData, [name] : e
      }))
    }
    
    
    const sendtx = async()=>{
      
      if (ethereum === undefined || ethereum.isConnected() === false) {
        alert('Connect Your Wallet First :(')
      }
      else if (ethereum.isConnected() === true) {
        const transfer = async()=>{
          const signer = new ethers.BrowserProvider(await ethereum).getSigner();
          (await signer).sendTransaction(
            {
              to: addressTo,
              value: ethers.parseEther(amount)
            }
            );
                        const setContract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());
                        const transaction =  await setContract.addToBlockchain(
                            addressTo,
                            ethers.parseEther(amount),
                            gif,
                            message)
                            
                          setIsLoader(true);
                          await transaction.wait();
                        }
                        await transfer();
                setIsLoader(false); 
            }
           await allTransactions();
    }
    
    const checkIfTransactionExists = async()=>{
        const count = Number(await getContract.getTransactionCount());
        window.localStorage.setItem('transactionCount',count);
    }
    
    const allTransactions = async()=>{
      const transactions = Object.values(await getContract.getAllTransactions());
      
      const arr = (transactions.map((val)=>{return Object.values(val)}));
      const me = [];
      let i = 0;
      while(i<transCount){
        const obj = {
          addressFrom : arr[i][0],
          addressTo : arr[i][1],
          amount : arr[i][2],
          message : arr[i][3],
          timestamp : arr[i][4],
          gif : arr[i][5]
        }
        me.push(obj);
        
        i++;
      }
      setAllTrans(me.reverse());
      console.log('done');
    }

    

    
    



















    const connectWallet = async () => {
      if (ethereum === undefined) {
        window.location = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    }
    else if (ethereum.isConnected === false) {
        await ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{
                eth_accounts: {}
            }]
        });
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts[0]);
        setShortAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(36, 42)}`);
        document.querySelector('.connect-wallet').innerHTML = 'Get Started!';
        allTransactions();
      }
    else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accounts[0]);
        setShortAddress(`${accounts[0].slice(0, 6)}...${accounts[0].slice(36, 42)}`);
        document.querySelector('.connect-wallet').innerHTML = 'Get Started!';
        allTransactions();
    }
}
  
  return (
    <div className='min-h-screen'>
    <div className='gradient-bg-welcome'>
    <Navbar/>
    
    <Home connectWallet={connectWallet} checkIfTransactionExists={checkIfTransactionExists} sendtx={sendtx} isLoader={isLoader} accounts={accounts} handleChange={handleChange} shortAddress= {shortAddress} setAccounts={setAccounts} setShortAddress={setShortAddress} formData={formData} setFormData={setFormData}/>
    <Services/>
    <Transactions formData={formData} allTrans={allTrans}  accounts={accounts} shortAddress={shortAddress}/>
    <Footer/>
    </div>
    </div>
  );
}

export default App;
