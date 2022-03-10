////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// index route
router.get('/', (req, res) => {
	// find the fruits
	Fruit.find({})
		// then render a template AFTER they're found
		.then((fruits) => {
			// console.log(fruits)
			res.render('fruits/index', { fruits })
		})
		// show an error if there is one
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	res.render('fruits/new')
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	// check if the readyToEat property should be true or false
	// we can check AND set this property in one line of code
	// first part sets the property name
	// second is a ternary to set the value
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
	// console.log('this is the fruit to create', req.body)
	// now we're ready for mongoose to do its thing
	Fruit.create(req.body)
		.then((fruit) => {
			// console.log('this was returned from create', fruit)
			res.redirect('/fruits')
		})
		.catch((err) => {
			console.log(err)
			res.json({ err })
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const fruitId = req.params.id
	// find the fruit
	Fruit.findById(fruitId)
		// -->render if there is a fruit
		.then((fruit) => {
			res.render('fruits/edit', { fruit })
		})
		// -->error if no fruit
		.catch((err) => {
			console.log(err)
			res.json(err)
		})
})

// update route -> sends a put request to our database
router.put('/:id', (req, res) => {
	// get the id
	const fruitId = req.params.id
	// check and assign the readyToEat property with the correct value
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
	// tell mongoose to update the fruit
	Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
		// if successful -> redirect to the fruit page
		.then((fruit) => {
			console.log('the updated fruit', fruit)

			res.redirect(`/fruits/${fruit.id}`)
		})
		// if an error, display that
		.catch((error) => res.json(error))
})

// show route
router.get('/:id', (req, res) => {
	// first, we need to get the id
	const fruitId = req.params.id
	// then we can find a fruit by its id
	Fruit.findById(fruitId)
		// once found, we can render a view with the data
		.then((fruit) => {
			res.render('fruits/show', { fruit })
		})
		// if there is an error, show that instead
		.catch((err) => {
			console.log(err)
			res.json({ err })
		})
})

// delete route
router.delete('/:id', (req, res) => {
	// get the fruit id
	const fruitId = req.params.id
	// delete the fruit
	Fruit.findByIdAndRemove(fruitId)
		.then((fruit) => {
			console.log('this is the response from FBID', fruit)
			res.redirect('/fruits')
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})
////////////////////////////////////////////
// Export the Router
////////////////////////////////////////////
module.exports = router