import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./../App.css";

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1);

  const getPokemonAPIData = async () => {
    let result = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 8}&limit=8`)
      .then((res) => res.data.results);
    const promises = result.map((item) =>
      axios.get(item.url).then((res) => res.data)
    );
    Promise.all(promises).then((responses) => {
      setPokemonData(responses);
    });
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    getPokemonAPIData();
  }, [page]);

  console.log("pokeAPIData", pokemonData);
  // console.log("pokemonData", pokemonData)

  return (
    <div>
      <Typography
        variant="h4"
        component="h4"
        marginTop={4}
        fontFamily={'"Segoe UI"'}
        fontWeight="bold"
      >
        Pokedex
      </Typography>
      <div className="CardView">
        <Grid container direction="row" justifyContent={"center"}>
          {pokemonData.map((item, index) => {
            return (
              <Grid
                item
                sm={4}
                md={2}
                margin={4}
                minHeight={250}
                minWidth={250}
              >
                <Card>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    margin={0.5}
                  >
                    <IconButton aria-label="add to favorites" size="small">
                      <StarIcon />
                    </IconButton>
                  </Box>
                  <Box justifyContent="center" alignItems="center">
                    <Typography
                      variant="subtitle1"
                      fontFamily={'"Segoe UI"'}
                      fontWeight="bold"
                    >
                      {item.name}
                    </Typography>
                  </Box>
                  <img
                    height={124}
                    width={96}
                    src={item.sprites.front_default}
                    alt={item.name}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={"center"}
                    marginBottom={4}
                  >
                    {item.types.map((item, index) => {
                      return (
                        <Chip
                          label={item.type.name}
                          color="primary"
                          style={{
                            backgroundColor: `#${Math.random().toString(16).substr(-6)}`,
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="Pagination">
        <Pagination count={10} onChange={handlePage} />
      </div>
    </div>
  );
};

export default HomePage;
