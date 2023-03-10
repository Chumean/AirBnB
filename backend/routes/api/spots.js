const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
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
    check('previewImage')
    .exists({checkFalsy: true})
    .isString()
    .withMessage("Preview Image is required."),
    handleValidationErrors
];

const validateReview = [
    check('review')
    .exists({checkFalsy: true})
    .isString()
    .withMessage("Review text is required"),
    check('stars')
    .exists({checkFalsy: true})
    .isFloat()
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

const validateBooking = [
    check('startDate')
    .exists()
    .isBefore('endDate')
    .isDate()
    .withMessage('endDate cannot be on or before startDate'),
    check('endDate')
    .exists()
    .isAfter('startDate')
    .isDate()
    .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
];


const validateQuery = [
    check('page')

]

// Get All Spots
router.get('/', async (req, res) =>{
    let {page, size} = req.query;

    page = Number(page);
    size = Number(size);

    if(Number.isNaN(page) || size < 0) page = 1;
    if(Number.isNaN(size) || size < 0) size = 20;

    let spots = [];

    spots = await Spot.findAll({
        limit: size,
        offset: Math.abs(size * (page - 1)),
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
            'price',
            'previewImage'
        ]
    });

    for await(let spot of spots) {
    // const previewImage = await SpotImage.findOne({
    //     where: {
    //         spotId: spot.id,
    //         preview: true
    //         }
    //     })

        //  if(previewImage) {
        // spot.dataValues.previewImage = previewImage.url
        // } else {
        // spot.dataValues.previewImage = null;
        // }

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

    return res.json({spots, page, size});
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
            'price',
            'previewImage'
        ]
    });

    for await(let spot of ownerSpots) {
        // const previewImg = await SpotImage.findOne({
        //     where: {
        //         spotId: spot.id,
        //         preview: true
        //     }
        // })

        // if(previewImg) {
        //     spot.dataValues.previewImg = previewImg.url
        // } else {
        //     spot.dataValues.previewImg = null;
        // }

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
router.get('/:spotId', async (req, res) => {

    const oneSpot = await Spot.findByPk(req.params.spotId, {
        include: [
                    {model: User},
                    {model: SpotImage}
            ]
        })

    const user = await User.findByPk(req.params.userId);



    if(!oneSpot){

        return res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }

    const reviews = await Review.findAll({
        where: {
            spotId: oneSpot.id
        }
    })

    let sum = 0;

    if(reviews.length) {
        reviews.forEach(ele => {
            sum += ele.stars
        });

        let avg = sum / reviews.length;

        oneSpot.dataValues.avgRating = avg;
    } else {
        oneSpot.dataValues.avgRating = null;
    }

    res.json(oneSpot)

});


// Create a Spot DONE
router.post('/', validateSpots, handleValidationErrors, requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price, previewImage } = req.body;

    const spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id, previewImage});

    return res.json(spot);

});



// Add an Image to a Spot based on Spot's id
router.post('/:spotId/images', requireAuth, async(req, res) =>{

    const currentSpot = await Spot.findByPk(req.params.spotId);

    if(!currentSpot) {
        res.status(404);
        return res.json({message: "Spot couldn't be found", statusCode: 404});
    }

        const { url, preview} = req.body;

        const image = await SpotImage.createImage({
            preview,
            url,
        })

        const resObj = {
            id: image.id,
            url: image.url,
            preview: image.preview
        };
        return res.status(201).json(resObj)
});



// Edit a Spot DONE
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

           return res.json({updateSpot})
        } else {
            return res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }


});


// Delete a Spot DONE
router.delete('/:spotId', requireAuth, async(req, res) => {
        const user = req.user.id;

        const deleteSpot = await Spot.findByPk(req.params.spotId);

        if(deleteSpot) {
            await deleteSpot.destroy();
            res.status(200).json({message: "Successfully deleted", statusCode: 200})
        } else {
            res.status(404).json({message: "Spot couldn't be found", statusCode: 404})

        }

});

// Get All Reviews by a Spot's id DONE
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

        } else {
        res.status(404).json({message: "Spot couldn't be found", statusCode: 404})
    }
    return res.json(reviews);
});

// router.get("/:spotId/reviews", async (req, res) => {
//     const spotReviews = await Review.findAll({
//       where: {
//         spotId: req.params.spotId,
//       },
//       include: [
//         {
//           model: User,
//           attributes: ["id", "firstName", "lastName"],
//           subQuery: false,
//         },
//         {
//           model: ReviewImage,
//           attributes: ["id", "url"],
//           subQuery: false,
//         },
//       ],
//     });
//     const spot = await Spot.findByPk(req.params.spotId);
//     if (spot === null) {
//       res
//         .status(404)
//         .json({ message: "Spot could not be found", statusCode: 404 });
//     }


//     res.json(spotReviews);
//   });


// Create a Review for spot on Spot's id DONE
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
    };

    const findSpot = await Spot.findByPk(req.params.spotId);

    if(!findSpot) {
        res.status(404).json({message: "Spot couldn't be found", statusCode: 404});
    };

    const newReview = await Review.create({review, stars, userId:req.user.id, spotId:req.params.spotId});

    res.json(newReview);

});


// Get all Bookings for a Spot based on Spot id
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    // let bookings = [];

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot)  return res.status(404).json({message: "Spot couldn't be found", statusCode: 404});

    if(spot.ownerId === req.user.id) {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId,
                userId: req.user.id
            },
            include: {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
        })
        return res.status(200).json({Bookings: bookings})
    } else {
        const bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: {
                exclude: ['id', 'userId', 'createdAt', 'updatedAt']
            }
        })
        return res.status(200).json({Bookings: bookings})
    }
        // if(req.params.ownerId === User.id) {

        //     bookings = await Booking.findAll({
        //         attributes: {
        //             include: [
        //                 'spotId',
        //             'userId',
        //             'startDate',
        //             'endDate'
        //             ]
        //         },
        //     include: {model: User}
        //     })

})

// Create a Booking from a Spot based on Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) =>{

    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) return res.status(404).json({message: "Spot couldn't be found", statusCode:404});

    const { startDate, endDate } = req.body;

    const start = new Date(startDate);


    const end = new Date(endDate);

    if(start >= end) {
        return res.status(400).json({
            message:"Validation error",
            statusCode: 400,
            errors: [
                "endDate cannot be on or before startDate"
                ]
        })
    };

    const allBookings = await Booking.findAll({
        include: {
            model: Spot,
            where: {
                id: req.params.spotId
            }
        }
    });


    const isBooked = allBookings.some(booking =>
        start.getTime() <= booking.startDate.getTime() && booking.startDate.getTime() <= end.getTime() ||
        booking.startDate.getTime() <= start.getTime() && end.getTime() <= booking.endDate.getTime() ||
        start.getTime() <= booking.endDate.getTime() && booking.endDate.getTime() <= end.getTime())


    if(!isBooked) {
        const newBooking = await Booking.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            startDate,
            endDate,
        });
        return res.status(201).json(newBooking)
    } else {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: [
                "Start date conflicts with an existing booking",
                'End date conflicts with an existing booking'
                ]
            })
        }

});








module.exports = router;
