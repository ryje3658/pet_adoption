import React from 'react';

import './card.styles.css'

export const Card = props => (
    <div className='card-container'>
        {/*This image is a placeholder. Still need to figure out how to import all images from database using React */}
        <img alt='pet' src={props.pet.picture_primary}/>
        <div> 
            <h1><strong>{props.pet.name}</strong></h1>
            {/*<p>Age: {props.pet.age}</p>
            <p>Pet Type: {props.pet.type}</p>
            <p>Pet Breed: {props.pet.breed}</p> */}
        </div> 
        <h2>{props.pet.availability}</h2>
    </div>
)