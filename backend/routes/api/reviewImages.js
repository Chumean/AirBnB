const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async(req, res) => {
    
    const user = req.user.id;

    const reviewImg = await ReviewImage.findByPk(req.params.imageId);

    if(reviewImg) {

        await reviewImg.destroy();

        return res.status(200).json({message: "Successfully deleted", statusCode: 200})
    } else {
        return res.status(404).json({message: "Review Image couldn't be found", statusCode: 404})
    }
});

module.exports = router;
