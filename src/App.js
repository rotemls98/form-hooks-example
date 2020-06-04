import React from 'react';
import FormOne from "./forms/v1/FormOne";
import logo from './logo.svg';
import FormThree from "./forms/v3/FormThree";
import FormTwo from "./forms/v2/FormTwo";
import './App.css';
import FormFour from "./forms/v4/FormFour";

function App() {
    return (
        <div className="App">
            <FormOne/>
            <FormTwo/>
            <FormThree/>
            <FormFour/>
        </div>
    );
}

export default App;
