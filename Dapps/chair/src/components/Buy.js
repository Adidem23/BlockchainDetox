import React from 'react'
import './Buy.css'
import {ethers} from 'ethers'

const Buy = (props) => {

    const buychai=async (event)=>{
     event.preventDefault();
     const {contract}=props.state;
     const name=document.getElementById('name');
     const msg=document.getElementById('msg');

     console.log("The Instances are : ");
     console.log(name.value,msg.value,contract);

     const amount={value:ethers.utils.parseEther("0.00001")}

     const transcation= await contract.buyChai(name,msg);

     await transcation.wait();

     console.log("Transaction is Done");

    }

  return (
    <div className='formdiv'>
    <form onSubmit={buychai} className="form2">

     <label>Name</label>
     <input type="text" id='name' placeholder='Enter your Name'></input>

     <label>Message</label>
     <input type="text" id='msg' placeholder='Enter your Message'></input>

    <button type='submit'>Pay For Chai</button>

    </form> 

    </div>
  )
}

export default Buy
