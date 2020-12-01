const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/peopleDB', { useNewUrlParser: true })

const solarSystemModel = new Schema({
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
    starName: String
})

const planetModel = new Schema({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'solarSystem'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
})

const visitorModel = new Schema({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'Planet'}]
})

const solarSystem = mongoose.model("Visitor", solarSystemModel)
const solarSystem = mongoose.model("Planet", planetModel)
const solarSystem = mongoose.model("solarSystem", visitorModel)

Visitor.findOne({}).populate("visitedPlanets").exec(function(err, visitor) {
    visitor.visitedPlanets.forEach(ele => console.log(ele.name))
})

Planet.findOne({}).populate("visitors").exec(function(err, planet) {
	    planet.visitors.forEach(ele => console.log(ele.name))
	})

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})