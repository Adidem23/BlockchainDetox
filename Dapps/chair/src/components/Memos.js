import React from 'react'
import { useState, useEffect } from 'react'

import './memo.css'

const Memos = (props) => {

  const [memos, setmemo] = useState([]);
  const { contract } = props.state;

  console.log(contract);
  useEffect(() => {
    const memomessage = async () => {
      const memos = await contract.getmemo();
      console.log("The memos are: ");
      console.log(memos);
      setmemo(memos);

    }

    contract && memomessage();


  }, [contract]);


  return (
    <>
        <p>Message</p>
        {memos.map((memo)=>{
          return(
            <div className='tr'>
            <table key={Math.random()}>
            <tbody>
            <tr>
              <td>{memo.name}</td>
              <td>{memo.message}</td>
              <td>{String(memo.timestamp)}</td>
              <td>{memo.from}</td>
            </tr>
            </tbody>
            </table>
            </div>
          )
        })}    
    </>

  )
}

export default Memos
