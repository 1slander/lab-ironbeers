const express = require('express');

const hbs = require('hbs');
const { get } = require('https');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + '/views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try{
    const beer = { beers: await punkAPI.getBeers() };
    res.render('beers.hbs', beer);
  }
  catch {
    (error => console.log(error))
  }
});

app.get('/beers/:id',async (req,res)=>{
  try{
    let beerId=req.params.id;
    //console.log(beerId);
    const getBeerId= await punkAPI.getBeer(beerId);
    res.render('partials/beerpartial',getBeerId[0])
    //console.log(getBeerId[0])

  }
  catch {
    (error => console.log(error))
  }
})

app.get('/random-beer',async (req,res)=>{
  try{
    const randomBeers= {beer:await punkAPI.getRandom()};
    res.render('random-beer.hbs',randomBeers)
  }
  catch {(error => console.log(error))
  }
})
// app.get('/random-beer', (req,res)=>{
  
//   res.render('random-beer.hbs')
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
