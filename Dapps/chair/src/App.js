import './App.css';
import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {

    const connectWallet = async () => {
      const contractAddress = "0x865151B7D95948476a954e930412CDCBc91b17Df";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log("The state is : ");
  console.log(state);

  return (
    <div className="App">

    <h1 className='App'>WelCome To Chai Dapp</h1>

     <Buy state={state}></Buy>
     
     <Memos state={state}></Memos>

    </div>
  );
}

export default App;
