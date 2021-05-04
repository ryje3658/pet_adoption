import React, { Component } from "react";
import {
  Grid,
  Header,
} from "semantic-ui-react";

class Filter extends Component {
 render(){
   return(
    <div className="search">
      <div className="input">
        <input type="text" placeholder="Search" className="prompt"/>
        <i className="search icon"></i>
      </div>
    </div>
   );
 }   
}

export default Filter;