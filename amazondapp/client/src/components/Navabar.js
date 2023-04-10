import React from 'react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './Navbar.css';


const Navabar = () => {

    const connect = async () => {
        const { ethereum } = window;

        const account = await ethereum.request({ method: "eth_requestAccounts", });

        let connectbut = document.getElementById("but");

        connectbut.innerText = account;

        ethereum.on('accountsChanged', async (account1) => {
            account1 = await ethereum.request({ method: "eth_requestAccounts", });
            connectbut.innerText = account1;
            alert("Account is Changed");
             
        })

    }



    return (
        <>
            <nav>
                <div className="nav__brand">
                    <h1>Dappazon</h1>
                </div>

                <input type={Text} className="nav__search" />

                <button type='button' className='nav__connect' onClick={connect} id="but">connect</button>

                <ul className='nav__links'>
                    <li><a>Clothing</a></li>
                    <li><a>Electronics</a></li>
                    <li><a>Toys</a></li>
                </ul>

            </nav>

        </>

    )
}

export default Navabar
