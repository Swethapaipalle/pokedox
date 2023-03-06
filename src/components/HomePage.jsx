import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Card,
  IconButton,
  Typography,
  Pagination,
  Chip,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import './../App.css';

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1);
  const [starInfo, setStarInfo] = useState([]);

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
  useEffect(() => {
    let getStarInfo = JSON.parse(localStorage.getItem("starInfo"));
    if (getStarInfo) {
      let fetchedData = getStarInfo;
      setStarInfo(fetchedData);
    }
    return () => {
      // window.localStorage.clear();
    };
  }, []);

  useEffect(() => {
    getPokemonAPIData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


  const handlePage = (e, value) => {
    setPage(value);
  };

  const handleStateClick = (id) => {
    let newStarInfo = Object.assign([], starInfo);
    if (newStarInfo.includes(id)) {
      let index = newStarInfo.indexOf(id);
      newStarInfo.splice(index, 1);
    } else {
      newStarInfo.push(id);
    }
    setStarInfo(newStarInfo);
    window.localStorage.setItem("starInfo", JSON.stringify(newStarInfo));
  };
  return (
    <div>
      <Typography
        variant="h4"
        component="h4"
        marginTop={1}
        fontFamily={'"Segoe UI"'}
        fontWeight="bold"
      >
        Pokedex
      </Typography>
      <div className="CardView">
        <Grid container direction="row" justifyContent={"center"}>
          {pokemonData.map((item) => {
            let isItemStarEnabled = starInfo?.includes(item.id);
            return (
              <Grid
                item
                key={item.id}
                sm={4}
                md={2}
                margin={4}
                minHeight={250}
                minWidth={250}
                className="CardList"              >
                <Card className="Card">
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    margin={0.5}
                  >
                    <IconButton
                      aria-label="add to favorites"
                      size="small"
                      onClick={() => handleStateClick(item.id)}
                    >
                      <StarIcon
                        style={{ color: isItemStarEnabled ? "gold" : "black" }}
                      />
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
                    height={110}
                    width={90}
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
                          key={item.slot}
                          label={item.type.name}
                          color="primary"
                          style={{
                            backgroundColor:
                              `#${Math.random().toString(16).substr(-6)}`,
                              marginBottom:"20px",
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
