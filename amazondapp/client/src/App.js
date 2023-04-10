import './App.css';
import abi from './abi/dapp.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Navabar from './components/Navabar';
import Section from './components/Section';
import Product from './components/Product';

function App() {

  const [provider, setprovider] = useState(null);
  const [contract, setcontract] = useState(null);

  const [elec, setelec] = useState(null);
  const [clothing, setclothing] = useState(null);
  const [toys, settoys] = useState(null);

  const [item, setitem] = useState({});
  const [toggle, settoggle] = useState(false);

  const togglepop=async (item)=>{
    setitem(item);
    toggle ? settoggle(false) : settoggle(true);
  }

  const loadblock = async () => {

    const { ethereum } = window;

    const deployedadd = "0x15443292A716103d7bde01CdcDb43eD010bCc70B";
    const contractabi = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum);
    setprovider(provider);

    const signers = provider.getSigner();

    const contract = new ethers.Contract(deployedadd, contractabi, signers)

    setcontract(contract);

    const items = []

    for (let i = 0; i < 9; i++) {
      const item = await contract.products(i + 1)
      items.push(item);
    }

    const electronics = items.filter((item) => item.category === 'electronics')


    const clothing = items.filter((item) => item.category === 'clothing')


    const toys = items.filter((item) => item.category === 'toys')


    setelec(electronics);
    setclothing(clothing);
    settoys(toys);


  }

  useEffect(() => {
    loadblock();
  }, []);


  return (
    <>
      <div className='App'>
        <Navabar />
        <h1>Dappazon Besties</h1>
        {elec && clothing && toys && (
          <>
            
            <h1>Products</h1>
            <Section title={"Clothing"} items={clothing} togglepop={togglepop} />
            <Section items={elec} title={"Elec"} togglepop={togglepop} />
            <Section title={"Toys"} items={toys} togglepop={togglepop} />
          </>

        )}

      {toggle && (
        <Product item={item} provider={provider}  contract={contract} togglepop={togglepop} />
      )}


      </div>
    </>

  );
}

export default App;
