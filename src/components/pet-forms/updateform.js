import React, { Component} from "react";
import { Button, Form, Input, TextArea, Divider, Grid, Image, Popup, Message } from 'semantic-ui-react'
import { Redirect} from "react-router-dom";
import axios from 'axios';
import "./updateform.css";

const cats = ["Domestic Shorthair", "American Shorthair", "Domestic Longhair", "Russian Blue", "Siamese", "Persian", "Bombay", "Maine Coon", "Bengal", "Savannah", "Devon Rex", "Siberian", "Birman", "Other" ]
const dogs = ["Golden Retriever", "Laborador Retriever", "French Bulldog", "Husky", "American Bulldog", "Dachshund", 
            "Chiuhuahua", "Pitt Bull", "Cocker Spaniel", "German Shepherd", "Beagle", "Yorkshire Terrier", "Boxer", 
            "Corgie", "Pug", "Australian Shepherd", "Pomeranian", "Great Dane", "Other" ]
const other = ["Fish", "Reptile", "Small Mammal", "Bird", "Other"]
let petoptions= null; 
let options = null;
let dispo = [];

let pet;
//get token saved
const token = localStorage.getItem("token");
let numdispos;


class UpdateForm extends Component {
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
        secondhidden: true,
        thirdhidden: true, 
        newprimary: false,
        newsecond: false,
        newthird: false, 
        removesecond: false,
        removethird: false,
        redirect: false,
        visible: false
        };   
        
    // submits updated pet infomration from form
    submitHandler = event => {
        let id = this.props.location.state.id
        event.preventDefault(); 
        const formdata = new FormData()  
        if (this.state.name !== null) {
            formdata.append('name', this.state.name)
        }
        if (this.state.type !== null) {
            formdata.append('type', this.state.type)
        }
        if (this.state.age !== null) {
            formdata.append('age', this.state.age)
        }
        if (this.state.gender !== null) {
            formdata.append('gender', this.state.gender)
        }
        if (this.state.weight !== null) {
            formdata.append('weight', this.state.weight)
        }
        if (this.state.disposition !== null) {
            formdata.append('disposition', this.state.disposition)
        }
        if (this.state.availability !== null) {
            formdata.append('availability', this.state.availability)
        }
        if (this.state.description !== null) {
            formdata.append('description', this.state.description)
        }
        if (this.state.breed !== null) {
            formdata.append('breed', this.state.breed)
        }
        if (this.state.newprimary === true) {
            formdata.append('picture_primary', this.state.picture_primary, this.state.picture_primary.name);
        }
        if (this.state.newsecond === true) {
            formdata.append('picture_second', this.state.picture_second, this.state.picture_second.name);
        }
        if (this.state.newthird === true) {
          formdata.append('picture_third', this.state.picture_third, this.state.picture_third.name);
        }
        axios.patch(`http://jensenry.pythonanywhere.com/api/pets/${id}/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }).then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
        let data = {};
        if (this.state.removesecond === true){
          data['picture_second'] = this.state.picture_second;
          if (this.state.removethird === true) {
            data['picture_third'] = this.state.picture_third;
          }
          console.log(data)
          axios.patch(`http://jensenry.pythonanywhere.com/api/pets/${id}/`, data, 
          {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
          }).then((res) => {
          console.log(res)
          })
          .catch((error) => {
          console.error(error)
          })
        } 
        if (this.state.removethird === true) {
          data['picture_third'] = this.state.picture_third;
          axios.patch(`http://jensenry.pythonanywhere.com/api/pets/${id}/`, data, 
          {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
          }).then((res) => {
          console.log(res)
          })
          .catch((error) => {
          console.error(error)
          })
        }
        this.setState({visible: true})   
    }

    // loads the pet data into form fields
    componentDidMount() {
      window.scrollTo(0, 0);                                         
      let id = this.props.location.state.id
        axios.get(`http://jensenry.pythonanywhere.com/api/pets/${id}/`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
        })
          .then((res) => {
            pet = res.data;
            this.setState({ name: pet["name"] });
            this.setState({ age: pet["age"] });
            this.setState({ weight: pet["weight"] });
            this.setState({ type: pet["type"] });
            if (this.state.type === "Dog") {
                petoptions = dogs;
                this.setState({ breed: pet["breed"] });
              } else if (this.state.type === "Cat") {
                petoptions = cats;
                this.setState({ breed: pet["breed"] });
              } else if (this.state.type === "Other") {
                petoptions = other;
              }
            options = petoptions.map((el) => <option key={el}>{el}</option>);
            this.setState({ breed: pet["breed"] });
            this.setState({ disposition: pet["disposition"].split(',') });
            numdispos = this.state.disposition.length;
            for (var i = 0; i < numdispos; i++){
                if (this.state.disposition[i] === "Good with other animals"){
                    dispo.push(this.state.disposition[i]);
                    document.getElementById("animals").checked = true;
                }
                if (this.state.disposition[i] === "Good with children"){
                    dispo.push(this.state.disposition[i]);
                    document.getElementById("children").checked = true;
                }
                if (this.state.disposition[i] === "Animal must be leashed at all times"){
                    dispo.push(this.state.disposition[i]);
                    document.getElementById("leashed").checked = true;
                }
            }
            this.setState({ availability: pet["availability"] });
            this.setState({ picture_primary: pet["picture_primary"] });
            this.setState({ description: pet["description"] });
            this.setState({ gender: pet["gender"] });
            if (pet["picture_second"] !== null) {
                this.setState({ secondhidden: false})
                this.setState({ picture_second: pet["picture_second"] })
            }
            if (pet["picture_third"] !== null) {
                this.setState({thirdhidden: false});
                this.setState({ picture_third: pet["picture_third"]})
            }
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
          }
          if (!event.target.checked) {
            for (var i=0; i <= dispo.length; i++) {
              if (dispo[i] === event.target.value){
                dispo.splice(i, 1);
                this.setState({ disposition: dispo});
              }
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
          this.setState({ newprimary: true});
        } else if (field === 'picture_second') {
          this.setState({picture_second: event.target.files[0]});
          this.setState({ newsecond: true});
        } else if (field === 'picture_third') {
          this.setState({picture_third: event.target.files[0]});
          this.setState({ newthird: true});
        }
      }

    // removes second picture
    removehandlers = () =>{
      this.setState( {picture_second: null} );
      this.setState({removesecond: true});  
      this.setState({secondhidden: true});
      this.setState({newsecond: false})              
    }

    // removes third picture
    removehandlert = () =>{
      this.setState( {picture_third: null} );
      this.setState({removethird: true});  
      this.setState({thirdhidden: true});
      this.setState({newthird: false})                              
    }
    
    // deletes pet
    removepet = () => {
      let id = this.props.location.state.id
        axios.delete(`http://jensenry.pythonanywhere.com/api/pets/${id}/`, {
          headers: {
              Authorization: `Bearer ${token}`
            }
      })
      this.setState({redirect:true})
    }

    // after pet removed, redirects
    removeredirect = () =>{
      if (this.state.redirect){
        return <Redirect to={{    
          pathname: "/shelter",
          state: { visible: true }
        }} />
      }
    }

    render() {
        return (
          <div>
            <h1 id='title'>Edit Pet:</h1>
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
                <label htmlFor='age' className="labels">Pet age: </label>
                <div className="ui input">
                  <Input type="number" id='age' name='age' value={this.state.age} onChange={this.changeHandler}/>
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
              <div className='eight wide column'> 
                <label htmlFor='weight' className="labels">Weight: </label>
                <div className="ui input">
                  <Input type="number" id='weight' name='weight' value={this.state.weight} onChange={this.changeHandler}/>
                </div>
              </div>
              </Form.Field>
              <br></br>
              <Form.Field inline>
              <div className='eight wide column'>
                <label htmlFor='type' className="labels">Type of pet: </label>
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
                    <select name='breed' id="breed" value={this.state.breed} onChange={this.changeHandler}>
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
                      id='animals'
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
                      id='children'
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
                      id='leashed'
                      name="disposition"
                      value='Animal must be leashed at all times'
                      //checked={this.state.dispo}
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
                    <option>Available</option>
                    <option>Adoption Pending</option>
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
                <Form.Field className='ten wide column' allownull='true'>
                <label className="labels">Change Images of Pet: </label>
                <Grid verticalAlign='middle' container>
                      <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={this.state.picture_primary} className="picture" alt="primary"/>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <input className="newimg" type="file" name='picture_primary' id='picture_primary' accept="image/*"  onChange={this.changeHandler} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>
                          { this.state.secondhidden === false &&
                              <Image src={this.state.picture_second} className="pictre" id="second" alt="second"/>
                          }
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <input type="file" className="newimg" name='picture_second' id='picture_second' accept="image/*" onChange={this.changeHandler} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                          <Popup                                          //new code
                            className='remove'
                            trigger={<Button icon="remove" color='red' type='button' onClick={this.removehandlers}></Button>}
                            content='Image Removed'
                            position='right center'
                            on="click"
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={3}>
                          { this.state.thirdhidden === false &&
                              <Image src={this.state.picture_third} className="picture" id="third" alt="third"/>
                          }  
                        </Grid.Column> 
                        <Grid.Column width={10}>
                          <input type="file" className="newimg" name='picture_third' id='picture_third' accept="image/*" onChange={this.changeHandler} />
                        </Grid.Column>
                        <Grid.Column width={1}>
                          <Popup
                            className='remove'
                            trigger={<Button icon="remove" color='red' type='button' onClick={this.removehandlert}></Button>}
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
                    header='Pet Updated!'
                    content= {this.state.name  + ' has been updated in your shelter.'}
                    />
                    }
                  <br></br>
                  <Button type="submit" primary>Save</Button>
                </div>
                <Divider hidden />
            </Form>
            <div>
              {this.removeredirect()}
              <Popup
                trigger={
                  <Button color='red' icon='remove' content='Remove Pet' />
                }
                content={<Button color='red' content='Confirm Remove Pet' onClick={this.removepet} />}
                on='click'
                position='right center'
              />
            </div>
            <p id="bottom"></p>
            </div>
          </div>
        )
    }
}

export default UpdateForm;
