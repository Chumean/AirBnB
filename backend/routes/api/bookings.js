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
    .withMessage('endDate cannot be on or before startDate'),
    check('endDate')
    .exists()
    .isAfter('startDate')
    .isString()
    .withMessage('endDate cannot be on or before startDate'),
    handleValidationErrors
]


// Edit a Booking
router.put('/:bookingId', requireAuth, validateBooking, async(req, res) =>{

});
// Delete a Booking
router.delete('/:bookingId', requireAuth, validateBooking, async(req, res) =>{

});

module.exports = router;
