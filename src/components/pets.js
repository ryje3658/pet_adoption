import React, { Component } from 'react';
import {Search} from "./search/search.component";
import {CardList} from "./card-list/pet-card.component";

class Pets extends Component{
    constructor() {
        super();
        this.state = {
          pets: [],
          searchField:""
        };
      }

      componentDidMount() {
        fetch('https://jensenry.pythonanywhere.com/api/pets/?format=json')
        .then(response => response.json())
        .then(names => this.setState({pets: names}))
      }
      render() {
        const {pets, searchField} = this.state;
        const filteredPets = pets.filter(item => {
          return Object.keys(item).some(key => 
            typeof item[key] === "string" && item[key].toLowerCase().includes(searchField.toLowerCase())
          );
        });
        return (
            <div>
                <Search 
                    placeholder="Search"
                    handleChange= {e => this.setState({searchField: e.target.value})}
                />
                <CardList pets={filteredPets} /> 
          </div>
        );
    }
}
export default Pets;
