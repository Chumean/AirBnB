const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { up } = require('../../db/seeders/20230120053909-demo-spot');
const router = express.Router();

const validateSpots = [
    check('address')
    .exists({checkFalsy: true})
    .withMessage('Street address is required'),
    check('city')
    .exists({checkFalsy: true})
    .isString()
    .withMessage('City is required'),
    check('state')
    .exists({checkFalsy: true})
    .isString()
    .withMessage('State is required'),
    check('country')
    .exists({checkFalsy: true})
    .isString()
    .withMessage('Country is required'),
    check('lat')
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage('Longitude is not valid'),
    check('name')
    .exists({checkFalsy: true})
    .isString()
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists({checkFalsy: true})
    .isString()
    .withMessage('Description is required'),
    check('price')
    .exists({checkFalsy: true})
    .isNumeric()
    .withMessage('Price per day is required'),
    handleValidationErrors
];

// Get All Spots
router.get('/', async (req, res) =>{
    let spots = [];

    spots = await Spot.findAll({
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price'
        ]
    })

    return res.json(spots);
});

// Get All spots owned by Current User
router.get('/current', requireAuth, async(req, res) =>{
    // const user = await User.findByPk(req.params.id);

    let ownerSpots = [];
    ownerSpots = await Spot.findAll({
        where: req.params.id,
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price'
        ]
    });
    return res.json(ownerSpots)
});
// Get details of a Spot From An id
router.get('/:spotId', validateSpots, async (req, res) => {
    // let oneSpot;

    try {

        const oneSpot = await Spot.findByPk(req.params.id);

        res.json(oneSpot)
    } catch (err) {
        res.status(404).json({message: "Spot couldn't be found"})
    }
});
// Create a Spot
router.post('/', validateSpots, async (req, res) => {
    try {

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price});

        res.json(spot);
    } catch (err) {
        res.status(400).json(handleValidationErrors);
    }
});
// Add an Image to a Spot based on Spot's id
router.post('/:spotId/images', async(req, res) =>{
    const currentSpot = Spot.findByPk(req.params.spotId);
    if(!currentSpot) {
        res.status(404);
        return res.json({message: "Spot couldn't be found", statusCode: 404});
    }

        const { url, preview, imageId = currentSpot.id} = req.body;

        const image = await SpotImage.createImage({imageId, preview, url})

        return res.status(201).json({image})
});
// Edit a Spot
router.put('/:spotId', validateSpots, async (req, res) => {

    try {

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const updateSpot = await Spot.findByPk(req.params.id);
        if(updateSpot) {
            if(address) updateSpot.address = address;
            if(city) updateSpot.city = city;
            if(state) updateSpot.state = state;
            if(country) updateSpot.country = country;
            if(lat) updateSpot.lat = lat;
            if(lng) updateSpot.lng = lng;
            if(name) updateSpot.name = name;
            if(description) updateSpot.description = description;
            if(price) updateSpot.price = price;

            updateSpot.save();
            res.json({details: updateSpot})
        }
    } catch (err) {
        res.status(404).json({message: "Spot couldn't be found"})
    }
});


// Delete a Spot
router.delete('/:spotId', validateSpots, async(req, res) => {
    try {
        const deleteSpot = await Spot.findByPk(req.params.id);
        if(deleteSpot) {
            await deleteSpot.destroy();
            res.status(200).json({message: "Successfully deleted"})
        }
    } catch(err) {
        res.status(404).json({message: "Spot couldn't be found"})
    }
});



module.exports = router;
