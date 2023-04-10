import './App.css';
import abi from './contracts/Greet.json'
import { ethers } from 'ethers'

function App() {

  const connectmetamask = async () => {

    const { ethereum } = window;

    let addline = document.getElementById("Address");
    const provider = new ethers.providers.Web3Provider(ethereum);

    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });

    addline.innerHTML = account;
    let bal1 = await provider.getBalance(addline.innerHTML);
    let bal2 = ethers.utils.formatEther(bal1);
    let accbal = document.getElementById("Balance");
    accbal.innerHTML = bal2;

    ethereum.on('accountsChanged', async (account) => {
      alert("Accounts Changed");
      addline.innerHTML = account;
      let bal1 = await provider.getBalance(addline.innerHTML);
      let bal2 = ethers.utils.formatEther(bal1);
      let accbal = document.getElementById("Balance");
      accbal.innerHTML = bal2;

    })


  }

  const getstr = async () => {

    const information = document.getElementById('info');

    const walletaddress = "0x345F56E0A9315D432B83892C4f88C5dF8F95bD7b";
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const abi22 = abi.abi;
    const contract = new ethers.Contract(walletaddress, abi22, signer);
    let strvalue = await contract.getstr();

    information.innerHTML = strvalue;

  }


  const changestr = async () => {

    const walletaddress = "0x345F56E0A9315D432B83892C4f88C5dF8F95bD7b";
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const abi22 = abi.abi;
    const contract = new ethers.Contract(walletaddress, abi22, signer);

    let strvaluechange = document.getElementById('value')

    let strvaluechangevalue = strvaluechange.value;

    await contract.updatestr(strvaluechangevalue);

    setTimeout(() => {
      strvaluechange.innerHTML = "";
    }, 1000)

    alert("String Updated Successfully");


  }

  return (
    <>


      {/* This is for Alert division  */}
      <div className="alert34">

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* This is end of division  */}


      <div className="App">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Greeter</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link">Address is:<strong id="Address"></strong></a>
                </li>

                <li className='nav-item'>
                  <a className="nav-link">Balance is:<strong id="Balance"></strong></a>
                </li>

              </ul>

              <button className="btn btn-outline-success" id="mc" onClick={connectmetamask}>Connect</button>

            </div>
          </div>
        </nav>

      </div>



      {/* This is for the card notification */}

      <div className="Text App">

        <div className="card">
          <img src="https://images.pexels.com/photos/12700843/pexels-photo-12700843.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="Image" />
          <div className="card-body">
            <h5 className="card-title" id="info">Bicycle Cards</h5>
            <input className="input" type="text" id="value" placeholder="Enter Text" />
            <button className="btn btn-primary" onClick={getstr}> Get Content</button>
            <button className="btn btn-primary" id="change" onClick={changestr}>Change</button>
          </div>
        </div>

      </div>

      {/* This is End for the card notification */}



    </>


  );
}

export default App;
