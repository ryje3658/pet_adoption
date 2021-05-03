import React from 'react';

import './card.styles.css'

export const Card = props => (
    <div className='card-container'>
        {/*This image is a placeholder. Still need to figure out how to import all images from database using React */}
        <img alt='pet' src={props.pet.picture_primary}/>
        <p> 
            <strong>{props.pet.name}</strong>, {props.pet.age}
        </p> 
        <h2>{props.pet.availability}</h2>
    </div>
)