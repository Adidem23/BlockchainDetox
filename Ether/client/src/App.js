import './App.css';
const { ethers } = require('ethers');


function App() {

  const walletaddress = '0x24a62e06dce74d7e380eea281c85168852330e78';

  const abi = [
    {
      "inputs": [],
      "name": "sendEthContract",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "sendEthUser",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_num",
          "type": "uint256"
        }
      ],
      "name": "setValue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "accountBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


  const setnumber = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletaddress, abi, signer);

    let arr = [3, 6, 7, 8, 9, 0, 1, 2, 3, 34, 67, 8, 9, 10, 45];

    let number = arr[Math.floor(Math.random() * arr.length)];
    console.log(number);

    await contract.setValue(number);
    alert("Number set Successfully");

  }

  const getnumber = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletaddress, abi, signer);

    let number2 = await contract.getValue();
    let numberhead = document.getElementById('getnum');
    numberhead.innerHTML = number2;

  }

  const payethers = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletaddress, abi, signer);

    let address = document.getElementById('address1')
    let ethvalue = document.getElementById('eth')

    let add = address.value;
    let eth2 = ethvalue.value;


    // let sendeth=await contract.sendEthContract({ value: ethers.utils.parseEther(eth2)});

    // let contractbal=await contract.contractBalance();

    // let truecontractval= ethers.utils.formatEther(contractbal)

    //  alert(truecontractval);

  await contract.sendEthUser(add,{ value: ethers.utils.parseEther(eth2)});

  }

  const connectWallet = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(walletaddress, abi, signer);


    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    let accountdiv = document.getElementById('acc');
    accountdiv.innerHTML = account;
    let accountdivbal = document.getElementById('accbal');
    let bal = await provider.getBalance(accountdiv.innerHTML);
    let bal2 = ethers.utils.formatEther(bal);
    accountdivbal.innerHTML = bal2;
  }

  return (

    <div className='App'>
      <div>
        <button id='but' onClick={connectWallet}>Connect</button>
      </div>
      <div>
        <h1> Your Account is : </h1>
        <p id='acc'></p>
        <h3> Your Account's Balance is : </h3>
        <p id='accbal'></p>
        <button id='butnum1' onClick={setnumber}>Set Number</button>
        <button id='butnum' onClick={getnumber}>Get Number</button>
        <h1>The Number is : </h1>
        <h1 id='getnum'></h1>
        <input id='address1' type={Text} placeholder="Enter Address" />
        <input id='eth' type={Number} placeholder="Enter Value" />
        <button onClick={payethers} id="pay">PayEthers</button>
      </div>
    </div>
  );
}

export default App;
