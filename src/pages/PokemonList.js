import React, { useState, useEffect, createContext, Component } from 'react';
import { Layout } from '../layout';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Toolbar,
    AppBar,
    TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { render } from 'react-dom';

export const RootContext = createContext();
const Provider = RootContext.Provider;

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
}));

const PokemonList = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    // state = {
    //     pokemonDex: [],
    //     myPoke: []
    // }

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            index + 1
                            }.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    // const handleSearchChange = (e) => {
    //     setFilter(e.target.value);
    // };
    // console.log(pokemonData)
    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <Grid item xs={6} sm={4} md={2} key={pokemonId}>
                <Card onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${name}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    // getItem = (pokemonId) => {
    //     const poke = this.state.pokemonDex.find(p => p.pokemonId == pokemonId);
    //     return poke;
    // }

    // addToMyPoke = (pokemonId) => {
    //     let tempPoke = [...this.state.pokemonDex];
    //     const poke = this.getItem(pokemonId);
    //     const index = tempPoke.indexOf(poke);

    //     this.setState(() => {
    //         return { pokemonDex: tempPoke, myPoke: [...this.state.myPoke, poke] }
    //     })
    // }

    // render() {
    return (
        <>
            <AppBar position="static">
                {/* <Toolbar>
                            <div className={classes.searchContainer}>
                                <SearchIcon className={classes.searchIcon} />
                                <TextField
                                    className={classes.searchInput}
                                    onChange={handleSearchChange}
                                    label="Pokemon"
                                    variant="standard"
                                />
                            </div>
                        </Toolbar> */}
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(
                        (pokemonId) =>
                            // pokemonData[pokemonId].name.includes(filter) &&
                            getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </>
    );
    // }
};

export default PokemonList;