import React, { useState, useEffect } from "react";
import { Card, Image, Button } from 'semantic-ui-react'
import axios from 'axios'
import jwt_decode from "jwt-decode"

import shelter_logo from '../assets/pet_shelter_logo.png';

function AnimalCard (props) {

  const url = `${props.animal}`
  const [animal, setAnimal] = useState(null)
  let content = null

  useEffect(() => {
      axios.get(url)
      .then(response => {
          setAnimal(response.data)
      })

  }, [url])

  if(animal){

      content = 
      <div>
          <Card.Group>
              <Card>
              <Card.Content>
                  <Image
                  floated='right'
                  size='mini'
                  src={animal.picture_primary}
                  />
                  <Card.Header>{animal.name}</Card.Header>
                  <Card.Meta>{animal.type}</Card.Meta>
                  <Card.Description>
                      <p><strong>Gender:</strong> {animal.gender} </p>
                      <p><strong>Age:</strong> {animal.age} year</p>
                      <p><strong>Weight:</strong> {animal.weight} lb</p>
                      <p><strong>Breed:</strong> {animal.breed}</p>
                      <p><strong>Disposition:</strong> {animal.disposition}</p>
                      <p><strong>Description:</strong> {animal.description}</p>
                  </Card.Description>
              </Card.Content>
              <Card.Content extra>
                  <div className='ui two buttons'>
                  <Button color='olive'>
                      Edit
                  </Button>
                  <Button color='red'>
                      Remove
                  </Button>
                  </div>
              </Card.Content>
              </Card>
              
          </Card.Group>
      </div>


  }

  return (
      <div>
          {content}

      </div>
  )

}

function Shelter(){
  
  let token = localStorage.getItem("token");
  let decodedToken = jwt_decode(token);
  //console.log("Decoded Token", decodedToken);

  const id = decodedToken.user_id
  
  const url = `https://jensenry.pythonanywhere.com/api/users/${id}`
  const [profiles, setProfiles] = useState({
    loading: false,
    data: null,
    error: false
  })

  useEffect(() => {
    setProfiles({
      loading: true,
      data: null,
      error: false
    })
    axios.get(url)
      .then(response => {
        setProfiles({
          loading: false,
          data: response.data,
          error: false
        })
      })
      .catch(()=> {
        setProfiles({
          loading: false,
          data: null,
          error: false
        })

      })

  }, [url])

  let content = null

  if(profiles.error){
    content = <p>
      There was an error loading content
    </p>
  }

  if(profiles.loading){
    content = <p>....loading</p>
  }


  if(profiles.data){
 
    content = 

    <div>
      <Card centered>
        <Card.Content textAlign='center'>
          <Card.Header>Shelter Profile</Card.Header>

        </Card.Content >
        <Image src={shelter_logo} wrapped ui={false} />
        <Card.Content>
          <Card.Header><p>Name: {profiles.data.profile.shelter_name}</p></Card.Header>
          <Card.Description>
            <p>Username: {profiles.data.username}</p>
            <p>Bio: {profiles.data.profile.bio}</p>
            <Button color='blue'>Add a Pet</Button>
          </Card.Description>
        </Card.Content>
        
        <p>Pets:</p>
        {profiles.data.pets.map((pet) =>{
          return (
            <AnimalCard
            animal = {pet}
          />)
        })}

      </Card>
      
      

    </div>
    
  }
  
  return (
    <div>
      {content}
    </div>
   
  
  )

}

  export default Shelter;