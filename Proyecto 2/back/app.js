require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios").default;

const { PORT = 3000 } = process.env;

const CACHE = {};
const ERROR = {};

app.use(cors());

app.get("/cache", function (req, res) {
  res.json({ data: CACHE });
});

app.post("/pokemon/:name", async function (req, res) {
  const { name } = req.params;
  if (CACHE[name]) {
    return res.json({ name, data: JSON.parse(CACHE[name]), isCached: true });
  }
  if (ERROR[name]) {
    return res.json({ name, data: JSON.parse(ERROR[name]), isCached: true });
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  let responseData;
  try {
    const { data } = await axios.get(url);
    responseData = data;
    CACHE[name] = JSON.stringify(data);
  } catch {
    responseData = data;
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
  res.json({ name, data: responseData, isCached: false });
});

app.get("/pokemon/:id", async function(req, res){
  const id = req.params.id;
  const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const urlEncounters = `https://pokeapi.co/api/v2/pokemon/${id}/encounters`;
  let lugarArray = [];
  let lugaresPokemones = await axios(urlEncounters);
  lugaresPokemones.data.forEach(data =>lugarArray.push(data.location_area.name));

  const especies = await axios(urlSpecies);
  const evolucion = await axios(especies.data.evolution_chain.url);
  let evolutions = getEvolutionResponse(evolucion.data.chain);

  const evolutionList= evolutions.map(({species})=>
  `${species.name}`
  );    

  function getEvolutionResponse(evolutions) {
    let evolutionChain = [evolutions];
    while (evolutions.evolves_to.length > 0) { 
        for(let i=0; i<evolutions.evolves_to.length; i++){
            evolutionChain.push(evolutions.evolves_to[i]);
        }
        evolutions = evolutions.evolves_to[0];
    }
    return evolutionChain;
}
res.json({ evol:evolutionList, lug: lugarArray });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`);
});
