import React, { Component } from "react";
import Select from 'react-select';
import DropdownBox from "./components/DropdownBox/DropdownBox";

class App extends Component {
  
  render() {
    return (
      <div className="container-fluid">
      <DropdownBox label="Custom Placeholder, Option, Value, and Arrow Components" />
      </div>
    );
  }
}

export default App;
