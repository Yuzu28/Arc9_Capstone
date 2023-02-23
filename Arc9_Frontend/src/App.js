import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './components/Home'
import Slider from './components/Slider'
import Games from './components/Games'
import GamesSinglePage from './components/GamesSinglePage';
import SearchPage from './components/SearchPage';
import PopularGames from './components/PopularGames';
import RecentlyReleased from './components/RecentlyReleased'

import favorites from './components/favorites';

// import NavBarRedesign from './components/NavBarRedesign'


function App() {
  return (
    <div className="App">
      {/* <h1>check111</h1> */}
      <Router>


        <Route path="/" component={NavBar} />



        <Route exact path="/" component={Slider}/>
        <Route exact path="/" component={Home}/>
        
        <Route exact path="/" component={PopularGames}/>
        <Route exact path="/" component={RecentlyReleased}/>

        <Route exact path="/" component={Games}/>


        <Route exact path="/games/:gamesId" component={GamesSinglePage} />

				<Route path="/search/:searchTerm" component={SearchPage} />
        <Route exact path="/users/favorites" component={favorites} />

        <Route exact path="/games/favorites" component={favorites} />

        <Route path="/results/" component={SearchPage} />







    </Router>
    </div>
  );
}

export default App;
