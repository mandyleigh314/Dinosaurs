const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgPromise = require('pg-promise')()

const app = express()

const database = pgPromise({ database: 'dinosaurDB' })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('mst', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mst')
app.use(express.static('public'))

app.get('/', (req, res) => {
  database.any(`SELECT * FROM "dinos" ORDER BY species`).then(dinos => {
    res.render('index', { dinos: dinos })
  })
})

app.get('/info/:id', (req, res) => {
  const dinoId = req.params.id
  const getOneDino = database
    .one(`SELECT * FROM "dinos" WHERE id = $(id)`, { id: dinoId })
    .then(getOneDino => {
      res.render('info', getOneDino)
    })
    .catch(error => res.render('error'))
})

app.listen(3000, () => {
  console.log('Dinos are alive in the year 3000')
})
