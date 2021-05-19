import React from 'react';
import {CardComp} from '../card/card.component';
import './pet-card.styles.css';

export const CardList = props => (
    <div className='card-list'>
        {props.pets.map(pet => (
            <CardComp key={pet.id} pet={pet}/>
        ))}
    </div>
);