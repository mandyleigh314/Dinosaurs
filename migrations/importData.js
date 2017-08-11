const data = require('./data.js')
const pgPromise = require('pg-promise')()

const database = pgPromise({ database: 'dinosaurDB' })

data.dinos.forEach(dino => {
  let newDino = {
    species: dino.species,
    length: dino.length,
    facts: dino.facts,
    img: dino.img
  }
  database
    .none(`INSERT INTO dinos (species, length, facts, img) VALUES ($(species), $(length), $(facts), $(img))`, newDino)
    .then()
})
