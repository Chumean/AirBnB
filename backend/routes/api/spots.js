const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

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
    .isString()
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists({checkFalsy: true})
    .isString()
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
router.get('/current', validateSpots, async(req, res) =>{

});
// Get details of a Spot From An id
router.get('/:spotId', validateSpots, async (req, res) => {
    const oneSpot = await Spot.findByPk(req.params.id);

    res.json(oneSpot)
});
// Create a Spot
router.post('/', validateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price});

    res.json(spot);
});
// Add an Image to a Spot based on Spot's id
router.post('/:spotId/images', validateSpots, async(req, res) =>{

});
// Edit a Spot
router.put('/:spotId', validateSpots, async (req, res) => {
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
        next({
            status: "error",
            message: "Spot couldn't be found"
        });
    }
});



module.exports = router;
