import React from 'react';
import FormOne from "./forms/v1/FormOne";
import FormTwo from "./forms/v2/FormTwo";
import FormThree from "./forms/v3/FormThree";
import FormFour from "./forms/v4/FormFour";
import './App.css';

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
