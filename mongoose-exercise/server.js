const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/peopleDB', { useNewUrlParser: true })
const personSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    age: Number
})
const Person = mongoose.model("person", personSchema)

app.post('/person', function(req, res) {
    let person = req.body
    let p1 = new Person({
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age
    })
    p1.save()
    res.end()
})

app.put('/person/:id', function(req, res) {
    let id = req.params.id
    Person.findByIdAndUpdate(id, {age: 80}, function(err, person) {
    })
    res.end()
})

app.delete('/apocalypse', function(req, res) {
    Person.find({}, function(err, people) {
        people.forEach(p => p.remove())
    })
    res.end()
})


const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})