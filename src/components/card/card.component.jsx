import React from 'react';

import './card.styles.css';
import { Card, Image} from 'semantic-ui-react'

export const CardComp = props => (
    <div className='card-container'>
        <Card.Group>
            <Card fluid>
                    <Image
                        src={props.pet.picture_primary}
                        className='animal-pics'
                    />
                <Card.Content>
                    <Card.Header>{props.pet.name}</Card.Header>
                    <Card.Meta>{props.pet.type}</Card.Meta>
                    <Card.Description>
                        
                        <strong>Gender:</strong> {props.pet.gender}
                        <br/>
                        <strong>Age:</strong> {props.pet.age} years
                        <br/>
                        <strong>Weight:</strong> {props.pet.weight} lbs
                        <br/>
                        <strong>Breed:</strong> {props.pet.breed}
                        <br/>
                        <strong>Disposition:</strong> {props.pet.disposition}
                        <br/>
                        <strong>Description:</strong> {props.pet.description}
                    
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <strong>Availability:</strong> {props.pet.availability} 
                    
                </Card.Content>
                <Card.Content extra>
                <button class="ui primary button">
                    Like
                </button>
                </Card.Content>
            </Card>
        </Card.Group>
    </div> 

)