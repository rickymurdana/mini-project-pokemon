import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import { MyPokemon, PokemonDetail, PokemonList } from './pages';
import { Nav } from './layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/mypokemon" render={(props) => <MyPokemon {...props} />} />
          <Route exact path="/" render={(props) => <PokemonList {...props} />} />

          <Route exact path="/:pokemonId" render={(props) => <PokemonDetail {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
