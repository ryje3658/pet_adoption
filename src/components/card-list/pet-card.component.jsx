import React from 'react';
import {Card} from '../card/card.component';
import './pet-card.styles.css';

export const CardList = props => (
    <div className='card-list'>
        {props.pets.map(pet => (
            <Card key={pet.id} pet={pet}/>
        ))}
    </div>
);