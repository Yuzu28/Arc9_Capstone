import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Slider from './components/Slider'
import Games from './components/Games'

function App() {
  return (
    <div className="App">
      {/* <h1>check111</h1> */}
      <Router>

        <Route path="/" component={NavBar} />
        {/* <Route exact path="/" component={Home}/> */}
        <Route exact path="/" component={Slider}/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/" component={Games}/>





    </Router>
    </div>
  );
}

export default App;
