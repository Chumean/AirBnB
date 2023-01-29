const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User, Spot, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const booking = require('../../db/models/booking');
const router = express.Router();

const validateBooking = [
    check('startDate')
    .exists()
    .isDate()
    .isAfter()
    .withMessage('endDate cannot come before startDate'),
    check('endDate')
    .exists()
    .isDate()
    .withMessage('endDate cannot come before startDate'),
    handleValidationErrors
]


// Get all of the Current User's Bookings DONE
router.get('/current', requireAuth, async(req, res) =>{
    let bookings = [];

    bookings = await Booking.findAll({
        include: [
            {model: Spot}
        ]

    });

    return res.json(bookings)

});

// Edit a Booking
// to do invalid value
router.put('/:bookingId', requireAuth, async(req, res) => {

    const {startDate, endDate } = req.body;

    const updateBooking = await Booking.findByPk(req.params.bookingId);

    if(!updateBooking) return res.status(404).json({message: "Booking couldn't be found", statusCode: 404})

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: ['endDate cannot be on or before startDate']
        })
    } else if (start.getTime() <= updateBooking.startDate.getTime() && updateBooking.endDate.getTime() <= end.getTime() ||
    updateBooking.startDate.getTime() <= start.getTime() && end.getTime() <= updateBooking.endDate.getTime() ||
    start.getTime() <= updateBooking.endDate.getTime() && updateBooking.endDate.getTime() <= end.getTime() ||
    start.getTime() <= updateBooking.startDate.getTime() && updateBooking.endDate.getTime() <= end.getTime()) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: [
                'Start date conflicts with an existing booking',
                'End date conflicts with an existing booking'
            ]
        })
    } else if (start.getTime() < updateBooking.endDate.getTime() && updateBooking.endDate.getTime() < new Date()) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    } else {
        updateBooking.startDate = startDate;
        updateBooking.endDate = endDate;
        await updateBooking.save();
        return res.json(updateBooking)
    }



    const allBookings = await Booking.findAll({
        attributes: {
            include: [
                'startDate',
                'endDate'
            ]
        }
    })

    // if(updateBooking) {

    //     let startTime = updateBooking.dataValues.startDate.getTime();
    //     let endTime = updateBooking.dataValues.endDate.getTime();

    //     const test1 = updateBooking.dataValues.startDate = startDate;

    //     const test2 = updateBooking.dataValues.endDate = endDate;
    //     await updateBooking.save();


    //     return res.json(updateBooking)

    //     } else {
    //     return res.status(400).json({
    //                 message: "Validation error",
    //                 statusCode: 400,
    //                 errors: ["endDate cannot come before startDate"]
    //     })
    // }
});

// Delete a Booking
// to do
router.delete('/:bookingId', requireAuth, async(req, res) =>{


    const deleteBooking = await Booking.findByPk(req.params.bookingId);

    // grab booking startDate


    if(!deleteBooking) {
        return res.status(404).json({message: "Booking couldn't be found", statusCode: 404})


    } else if (deleteBooking.startDate.getTime() < new Date().getTime()) {
        // if true, send error 403
        return res.status(403).json({message: "Bookings that have been started can't be deleted", statusCode: 403})
    } else {
    await deleteBooking.destroy();
    return res.status(200).json({message: "Successfully deleted",statusCode:200})
    }
});

module.exports = router;
