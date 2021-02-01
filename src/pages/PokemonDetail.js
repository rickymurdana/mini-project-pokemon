import React, { useEffect, useState } from 'react';
import { Layout } from '../layout';
import { Typography, Link, CircularProgress, Button, Box, Grid } from "@material-ui/core";
import axios from "axios";
import { fade, makeStyles } from "@material-ui/core/styles";
import { PokemonConsumer } from '../context';
import { RootContext } from '../pages/PokemonList';

const useStyles = makeStyles((theme) => ({
    box: {
        paddingTop: "5px",
        paddingLeft: "10px",
        paddingRight: "5px",
        paddingBottom: "5px"
    }
}));

const PokemonDetail = props => {
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;

    const classes = useStyles();
    const [pokemon, setPokemon] = useState(undefined);
    const [pokedex, setPokedex] = useState([]);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);

    const catchPokemon = (pokemon) => {
        setPokedex(state => {
            const monExists = (state.filter(p => pokemon.id == p.id).length > 0);

            if (!monExists) {
                state = [...state, pokemon]
                state.sort(function (a, b) {
                    return a.id - b.id
                })
            }
            return state
        })
    }

    const generatePokemonJSX = (pokemon) => {
        const { name, id, species, height, weight, types, sprites, moves } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <>
                <Typography variant="h6">
                    {`${id}.`} {(name)}
                </Typography>
                <img style={{ width: "150px", height: "150px" }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon Info</Typography>
                <Typography>
                    Species: {species.name}
                </Typography>
                <Typography>Height: {height} </Typography>
                <Typography>Weight: {weight} </Typography>
                <Typography> Types: </Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography className={classes.box} key={name}> {`${name}`} </Typography>;
                })}
                <Typography> Moves:</Typography>
                {moves.map((moveInfo) => {
                    const { move } = moveInfo;
                    const { name } = move;
                    return <Typography className={classes.box} key={name}> {`${name}`} </Typography>;
                })}
            </>
        );
    };
    console.log(pokemon)
    return (
        <>

            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
            {pokemon === false && <Typography> Pokemon not found</Typography>}
            {
                pokemon !== undefined && (
                    <div>
                        <Button variant="contained" onClick={() => history.push("/")}>
                            back to pokedex
                            </Button>
                        <Button onClick={() => catchPokemon(pokemon)}>
                            Catch!
                            </Button>
                        <div className="pokedex-list">
                            {pokedex.map(pokemon => (
                                <div className="pokemon" key={pokemon.id}>
                                    <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} className="sprite" />
                                    <h3 className="pokemon-name">{pokemon.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    );
};



export default PokemonDetail;