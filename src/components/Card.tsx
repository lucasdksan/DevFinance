import React from 'react';
import '../styles/components/Card.css';

interface Props {
    name: string;
    value: number;
    addClass?: string;
    image: string;
}

const Card:React.FC<Props> = ({ name, value, addClass, image })=>{
    return(
        <div className={`card ${addClass}`}>
            <h3>
                <span>{name}</span>
                <img src={image} alt='Icones do Card'/>
            </h3>
            <p>R$ {value}</p>
        </div>
    );
}

export default Card;