const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage, Review, ReviewImage } = require('../../db/models');
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

const validateReview = [
    check('review')
    .exists({checkFalsy: true})
    .isString()
    .withMessage("Review text is required"),
    check('stars')
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]
// Get All Spots
// to do add avgrating and preview image - DONE
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
    });

    for await(let spot of spots) {
    const previewImage = await SpotImage.findOne({
        where: {
            spotId: spot.id,
            preview: true
            }
        })

         if(previewImage) {
        spot.dataValues.previewImage = previewImage.url
        } else {
        spot.dataValues.previewImage = null;
        }

        const rating = await Review.findAll({
        where: {
            spotId: spot.id
            }
        })

        let sum = 0;

         if(rating.length) {

        rating.forEach(ele => {
            sum += ele.stars
        });

        let avg = sum / rating.length

        spot.dataValues.avgRating = avg;
        } else {
        spot.dataValues.avgRating = null;
            }
    }

    return res.json(spots);
});

// Get All spots owned by Current User
// to do add preview image and avg rating - DONE
router.get('/current', requireAuth, async(req, res) =>{

    let ownerSpots = [];

    ownerSpots = await Spot.findAll({

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

    for await(let spot of ownerSpots) {
        const previewImg = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })

        if(previewImg) {
            spot.dataValues.previewImg = previewImg.url
        } else {
            spot.dataValues.previewImg = null;
        }

        const rating = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        let sum = 0;

        if(rating.length) {
            rating.forEach(ele => {
                sum += ele.stars
            });

            let avg = sum / rating.length;

            spot.dataValues.avgRating = avg;
        } else {
            spot.dataValues.avgRating = null;
        }
    }

    return res.json(ownerSpots)
});

// Get details of a Spot From An id
// to do add spot images and owner , check for no spot id error
router.get('/:spotId', async (req, res) => {


    const oneSpot = await Spot.findByPk(req.params.spotId);

    const images = await SpotImage.findAll({
            where: {
                spotId: req.params.spotId
            }
        })

        oneSpot.dataValues.SpotImages = images;


    const previewImage = await SpotImage.findOne({
            where: {
                spotId: oneSpot.id,
                // preview: true
            }
        })

    if(previewImage) {
            oneSpot.previewImage = previewImage.url
        } else {
            oneSpot.previewImage = null;
        }


    const rating = await Review.findAll({
            where: {spotId: oneSpot.id}
        })

    let sum = 0;

    if(rating.length) {

            rating.forEach(ele => {
                sum += ele.stars
            });

            let avg = sum / rating.length

            oneSpot.dataValues.avgRating = avg;
    } else {
        oneSpot.dataValues.avgRating = null;
    }

    if(!oneSpot){

        return res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    res.json(oneSpot)

});


// Create a Spot
router.post('/', validateSpots, async (req, res) => {
    try {

        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id});

        res.json(spot);
    } catch (err) {
        res.status(400).json(handleValidationErrors);
    }
});



// Add an Image to a Spot based on Spot's id
// to do correct response image done
router.post('/:spotId/images', async(req, res) =>{

    const currentSpot = Spot.findByPk(req.params.spotId);

    if(!currentSpot) {
        res.status(404);
        return res.json({message: "Spot couldn't be found", statusCode: 404});
    }

        const { url, preview} = req.body;

        const image = await SpotImage.createImage({preview, url})
        const resObj = {
            id: image.id,
            url: image.url,
            preview: image.preview
        };
        return res.status(201).json(resObj)
});



// Edit a Spot
// to do remove try/catch
router.put('/:spotId', requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const updateSpot = await Spot.findByPk(req.params.spotId);

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

            await updateSpot.save();

            res.json({updateSpot})
        } else {
            res.status(404).json({message: "Spot couldn't be found"})
    }


});


// Delete a Spot
router.delete('/:spotId', requireAuth, async(req, res) => {

        const deleteSpot = await Spot.findByPk(req.params.spotId);

        if(deleteSpot) {
            await deleteSpot.destroy();
            res.status(200).json({message: "Successfully deleted"})
        } else {
            res.status(404).json({message: "Spot couldn't be found"})

        }

});

// Get All Reviews by a Spot's id
// user , reviewimg
router.get('/:spotId/reviews', async (req, res) =>{

    let reviews = [];

    const spot = await Spot.findByPk(req.params.spotId)

if(spot) {

    reviews = await Review.findAll({
        attributes: {
            include: [
                'userId',
                'spotId',
                'review',
                'stars'
            ]
        },
        include: [
                {model: User},
                {model: ReviewImage}
        ]

    })
    console.log("HEREEEEEEEEEEEEEEE")
    console.log(reviews)
} else {
res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
}
    return res.json(reviews);
});


// Create a Review for spot on Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) =>{

    const { review, stars} = req.body;

    const existingReview = await Review.findOne({
        where: {
            userId:req.user.id,
            spotId:req.params.spotId
        }
    });

    if(existingReview) {
        res.status(403).json({message: "User already has a review for this spot", statusCode: 403})
    }

    const findSpot = await Spot.findByPk(req.params.spotId);

    if(!findSpot) {
        res.status(404).json({message: "Spot couldn't be found", statusCode: 404});
    }

    const newReview = await Review.create({review, stars, userId:req.user.id, spotId:req.params.spotId});
    // console.log(newReview)
    res.json(newReview);

        // res.status(400).json(handleValidationErrors);

});
module.exports = router;
