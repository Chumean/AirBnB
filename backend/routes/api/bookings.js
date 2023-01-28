const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User, Spot, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateBooking = [
    check('startDate')
    .exists()
    .isBefore('endDate')
    .isString()
    .withMessage('endDate cannot come before startDate'),
    check('endDate')
    .exists()
    .isAfter('startDate')
    .isString()
    .withMessage('endDate cannot come before startDate'),
    handleValidationErrors
]


// Get all of the Current User's Bookings
router.get('/current', requireAuth, async(req, res) =>{
    let bookings = [];

    bookings = await Booking.findAll({
        attributes: {
            include: [
                "spotId",
                {model: User}
            ]
        },
        include: [
            "userId",
            "startDate",
            "endDate"
        ]
    });

    return res.json(bookings)

});

// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async(req, res) =>{
    const currentDate = new Date();

    const { startDate, endDate } = req.body;
    const updateBooking = await Booking.findByPk(req.params.id, {
        attributes: {
            include: [
                'startDate',
                'endDate'
            ]
        }
    });

    const bookingStartKey = updateBooking.startDate;
    const bookStartParse = Date.parse(bookingStartKey);

    const bookingEndKey = updateBooking.endDate;
    const bookEndParse = Date.parse(bookingEndKey);

    if(updateBooking){
        if(startDate){
            updateBooking.startDate = startDate
        };

        if(endDate){
            updateBooking.endDate = endDate
        }

        await updateBooking.save();

        return res.json(updateBooking)
    } else {
        return res.status(404).json({message: "Spot couldn't be found", statusCode: 404});
    }

});
// Delete a Booking
router.delete('/:bookingId', requireAuth, validateBooking, async(req, res) =>{

    // grab current time
    const currentDate = new Date();

    const deleteBooking = await Booking.findByPk(req.params.id, {
        attributes: {
            include: ['startDate']
        }
    });

    // grab booking startDate
    const bookingStart = deleteBooking.startDate;
    const bookingDate = Date.parse(bookingStart);

    if(deleteBooking) {
        await deleteBooking.destroy();
        return res.status(200).json({message: "Successfully deleted"})

        // compare if current time is on or after startDate
    } else if (currentDate.getTime() >= bookingDate.getTime()) {
        // if true, send error 403
        return res.status(403).json({message: "Bookings that have been started can't be deleted"})

    } else {
            return res.status(404).json({message: "Booking couldn't be found", statusCode: 404})
    }

});

module.exports = router;
