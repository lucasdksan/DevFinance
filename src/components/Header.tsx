import React from 'react';
import '../styles/components/Header.css';
import logoDevF from '../assets/logo.svg';

const Header = ()=>{
    return(
        <header>
            <img src={logoDevF} alt="Logo Dev Finance" />
        </header>
    );
}

export default Header;