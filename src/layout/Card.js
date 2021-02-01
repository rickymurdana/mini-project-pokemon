import React from 'react';
import './Card.css';

function Card({ pokemon }) {
    return (
        <div className='Card'>
            <div className='Card__img'>
                <img src={pokemon.sprites.front_default} alt='' />
            </div>
            <div className='Card__name'>
                {pokemon.id}. {pokemon.name}
            </div>
        </div>
    )
}

export default Card;