import React, { Component, useEffect } from 'react';
import axios from 'axios';

const PokemonContext = React.createContext();

// const [pokemonData, setPokemonData] = useState({});

// useEffect(() => {
//     axios
//         .get(`https://pokeapi.co/api/v2/pokemon`)
//         .then(function (response) {
//             const { data } = response;
//             const { results } = data;
//             const newPokemonData = {};
//             results.forEach((pokemon, index) => {
//                 newPokemonData[index + 1] = {
//                     id: index + 1,
//                     name: pokemon.name,
//                     sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
//                         index + 1
//                         }.png`,
//                 };
//             });
//             setPokemonData(newPokemonData);
//         });
// }, []);

class PokemonProvider extends Component {
    state = {
        pokemonDex: [],
        myPoke: []

    };

    getItem = (id) => {
        const poke = this.state.pokemonDex.find(p => p.id == id);
        return poke;
    }

    addToMyPoke = (id) => {
        let tempPoke = [...this.state.pokemonDex];
        const poke = this.getItem(id);
        const index = tempPoke.indexOf(poke);

        this.setState(() => {
            return { pokemonDex: tempPoke, myPoke: [...this.state.myPoke, poke] }
        })
    }

    render() {
        return (
            <PokemonContext.Provider value={
                {
                    ...this.state,
                    addToMyPoke: this.addToMyPoke
                }
            }>
                {this.props.children}
            </PokemonContext.Provider>
        )

    }
}

const PokemonConsumer = PokemonContext.Consumer;

export { PokemonProvider, PokemonConsumer };