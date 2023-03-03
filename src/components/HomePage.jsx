import React, { useEffect, useState } from 'react'
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const HomePage = () => {
    let count = 1
    const [pokeAPIData, setPokeAPIData] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const [page, setPage] = useState(1);
    const [version, setVersion] = useState([]);
    const [url, setUrl] = useState();

    const getPokemonAPIData = async () => {

        let result = await axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results)
        setPokeAPIData(result)
    }


    useEffect(() => {
        getPokemonAPIData()
    }, [])

    const getPokemonList = async (apiData) => {

        apiData.map(((item, index) => {


        }))

    };

    getPokemonList(pokeAPIData);


    console.log("pokeAPIData", pokeAPIData)
    // console.log("pokemonData", pokemonData)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3} lg={3}>
                {pokeAPIData.map(((item, index) => {
                    return (
                        <div style={{ height: "20%", width: "20%", margin: "100px" }}>{item.name}</div>
                    )

                }))}
            </Grid>
            <Grid item xs={12} md={3} lg={3} >
                <Stack spacing={2}>
                    <Pagination count={10} />
                </Stack>
            </Grid>
            </Grid>
    )
}

export default HomePage