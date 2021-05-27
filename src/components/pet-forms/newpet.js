import React, { Component} from "react";
import { Button, Form, Input, TextArea, Divider, Grid, Popup, Message } from 'semantic-ui-react'
import axios from 'axios';
import "./newpet.css";

const cats = ["Domestic Shorthair", "American Shorthair", "Domestic Longhair", "Russian Blue", "Siamese", "Persian", "Bombay", "Maine Coon", "Bengal", "Savannah", "Devon Rex", "Siberian", "Birman", "Other" ]
cats.sort();
const dogs = ["Golden Retriever", "Laborador Retriever", "French Bulldog", "Husky", "American Bulldog", "Dachshund", 
            "Chiuhuahua", "Pitt Bull", "Cocker Spaniel", "German Shepherd", "Beagle", "Yorkshire Terrier", "Boxer", 
            "Corgie", "Pug", "Australian Shepherd", "Pomeranian", "Great Dane", "Other" ]
dogs.sort();
const other = ["Fish", "Reptile", "Small Mammal", "Bird", "Other"]
let petoptions= null; 
let options = null;
let dispo = [];

// get token saved
const token = localStorage.getItem("token");

class PetForm extends Component {
    state = {
        name: '',
        gender: '',
        age: '',
        weight:'',
        type: '',
        breed: '',
        availability: '', 
        description: '',
        disposition: [],
        picture_primary: null,
        picture_second: null,
        picture_third: null,
        disableddispo: null,
        visible: false
        };
 
    submitHandler = event => {
        event.preventDefault(); 
        const formdata = new FormData()  
        formdata.append('name', this.state.name)
        formdata.append('type', this.state.type)
        formdata.append('age', this.state.age)
        formdata.append('gender', this.state.gender)
        formdata.append('weight', this.state.weight)
        formdata.append('disposition', this.state.disposition)
        formdata.append('availability', this.state.availability)
        formdata.append('description', this.state.description)
        formdata.append('breed', this.state.breed)
        formdata.append('picture_primary', this.state.picture_primary, this.state.picture_primary.name);
        if (this.state.picture_second !== null) {
          formdata.append('picture_second', this.state.picture_second, this.state.picture_second.name);
        }
        if (this.state.picture_third !== null) {
          formdata.append('picture_third', this.state.picture_third, this.state.picture_third.name);
        }
        axios.post('https://jensenry.pythonanywhere.com/api/pets/', formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          if (res.status === 201) {          
            this.setState({visible: true})
          }                                         
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    //changes the pet breeds based off type selected
    breedOptionHandler = event => {
      this.setState({ type: event.target.value });
      if (event.target.value === "Dog") {
        petoptions = dogs;
      } else if (event.target.value === "Cat") {
        petoptions = cats;
      } else if (event.target.value === "Other") {
        petoptions = other;
      }
      options = petoptions.map((el) => <option key={el}>{el}</option>);
    }

    changeHandler = event => {
        const field = event.target.name;
        if (field === "name") {
          this.setState({ name: event.target.value });
        } else if (field === "age") {
          this.setState({ age: event.target.value });
        } else if (field === "weight") {
          this.setState({ weight: event.target.value });
        } else if (field === "breed") {
          this.setState({ breed: event.target.value });
        } else if (field === "disposition") {
          if (event.target.checked) {
            dispo.push(event.target.value);
            this.setState({ disposition: dispo});
            this.setState({ disableddispo: "y"})
          }
          if (event.target.checked === false) {
            for (var i=0; i <= dispo.length; i++) {
              if (dispo[i] === event.target.value){
                dispo.splice(i, 1);
                this.setState({ disposition: dispo});
              }
            }
            if (!dispo[0]) {
              this.setState({disableddispo: null})
            }
          }
        } else if (field === "availability") {
          this.setState({ availability: event.target.value });
        } else if (field === "description") {
          this.setState({ description: event.target.value });
        } else if (field === "gender") {
          this.setState({ gender: event.target.value });
        } else if (field === 'picture_primary') {
          this.setState({picture_primary: event.target.files[0]});
        } else if (field === 'picture_second') {
          this.setState({picture_second: event.target.files[0]});
        }else if (field === 'picture_third') {
          this.setState({picture_third: event.target.files[0]});
        }
      }
    
    // removes second image
    resetImageS = event => {
      this.setState({picture_second: null})
    }

    // removes third image
    resetImageT = event => {
      this.setState({picture_third: null})
    }

    render() {
        return (
          <div>
            <h1 id='title'>Add Pet:</h1>
            <div id='form'>
            <Form size='large' onSubmit={this.submitHandler} method="POST" >
            <Form.Field inline >
              <div className='eight wide column'> 
                <label className="labels" htmlFor='name' >Pet Name: </label>
                <div className="ui input">
                  <Form.Input type="text" id='name' name='name' value={this.state.name} onChange={this.changeHandler} />
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
                <div className='eight wide column'>
                 <label className="labels">Gender: </label>
                <div className='ui input'>
                  <select name='gender' id='gender' value={this.state.gender} onChange={this.changeHandler}>
                    <option hidden>Select One</option>
                    <option>F</option>
                    <option>M</option>
                  </select>
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
              <div className='eight wide column'> 
                <label className="labels" htmlFor='age'>Pet age: </label>
                <div className="ui input">
                  <Input type="number" id='age' name='age' value={this.state.age} onChange={this.changeHandler}/>
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
              <div className='eight wide column'> 
                <label className="labels" htmlFor='weight'>Weight: </label>
                <div className="ui input">
                  <Input type="number" id='weight' name='weight' value={this.state.weight} onChange={this.changeHandler}/>
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
              <div className='eight wide column'>
                <label className="labels" htmlFor='type'>Type of pet: </label>
                  <div className="ui input">
                      <select name='type' id='type' value={this.state.type} onChange={this.breedOptionHandler} >
                        <option hidden>Select One</option>
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Other</option>
                    </select>
                  </div>
                </div>
                </Form.Field>
                <br></br>
                <Form.Field inline>
                <div className='eight wide column'>
                  <label className="labels">Breed: </label>
                  <div className="ui input">
                    <select name='breed' value={this.state.breed} onChange={this.changeHandler}>
                      <option hidden >Select One</option>
                        {options}
                    </select>
                  </div>
                </div>
                </Form.Field>
                <br></br>
                <Form.Field>
                  <div>
                    <label className="labels" htmlFor='dis'>Disposition: </label>
                  </div>
                  <div className="ui checkbox">
                    <input
                      name="disposition"
                      type='checkbox'
                      value='Good with other animals'
                      onChange={this.changeHandler} />
                      <label> Good with other animals</label>
                    </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui checkbox">
                    <input
                      type='checkbox'
                      name="disposition"
                      value="Good with children"
                      onChange={this.changeHandler}/>
                    <label> Good with children</label>
                  </div>
                </Form.Field>
                <Form.Field>
                  <div className="ui checkbox">
                    <input
                      type='checkbox'
                      name="disposition"
                      value='Animal must be leashed at all times'
                      onChange={this.changeHandler}/>
                    <label> Animal must be leashed at all times</label>
                  </div>
                </Form.Field>
                <br></br>
                <Form.Field inline>
                <div>
                  <label className="labels" htmlFor='availability'>Availability: </label>
                  <div className="ui input">
                  <select  name='availability' id='availability' value={this.state.availability} onChange={this.changeHandler}>
                    <option hidden>Select One</option>
                    <option>Not Available</option>
                    <option>Available</option>
                    <option>Pending</option>
                    <option>Adopted</option>
                  </select>
                  </div>
                </div>
                </Form.Field>
                <br></br>
                <Form.Field className='eight wide column' required>
                <div> 
                <label className="labels" htmlFor='description'>Description: </label>
                <div>
                  <TextArea id='description' 
                  name='description' 
                  value={this.state.description} 
                  onChange={this.changeHandler} 
                  rows={4}/>
                </div>
                </div>
                </Form.Field>
                <br></br>
                <Form.Field className='eight wide column'>
                <label className="labels">Upload Images of Pet: </label>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <input required type="file" name='picture_primary' id='picture_primary' accept="image/*" onChange={this.changeHandler} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <input type="file" name='picture_second' id='picture_second' accept="image/*" onChange={this.changeHandler} />
                    </Grid.Column>
                    <Grid.Column width={1}>
                    <Popup
                      trigger={<Button icon="remove" type='button' color='red' onClick={this.resetImageS}></Button>}
                      content='Image Removed'
                      position='right center'
                      on="click"
                    />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={13}>
                    <input type="file" name='picture_third' id='picture_third' accept="image/*"  onChange={this.changeHandler} />
                    </Grid.Column>
                    <Grid.Column width={1}>
                      <Popup
                        trigger={<Button icon="remove" color='red' type='button' onClick={this.resetImageT}></Button>}
                        content='Image Removed'
                        position='right center'
                        on="click"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                </Form.Field>
                <div>
                  { this.state.visible === true &&              
                      <Message
                      compact
                      onDismiss={this.handleDismiss}
                      color='green'
                      header='Pet Added!'
                      content= {this.state.name  + ' has been added to your shelter.'}
                      />
                  }
                  <br></br>
                  <Button disabled={
                    !this.state.name
                    || !this.state.type
                    || !this.state.weight
                    || !this.state.age
                    || !this.state.breed
                    || !this.state.disableddispo
                    || !this.state.description
                    || !this.state.availability
                    || !this.state.picture_primary
                    || !this.state.gender
                  }
                  primary>Add pet</Button>
                </div>
                <Divider hidden />
            </Form>
            </div>
          </div>
        )
    }
}

export default PetForm;
