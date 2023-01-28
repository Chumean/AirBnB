const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { User, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res) => {

    const deleteSpotImage = await SpotImage.findByPk(req.params.newImg.id);

    if(deleteSpotImage) {
        await deleteSpotImage.destroy();
        return res.status(200).json({message: "Successfully deleted", statusCode:200});
    } else {
        return res.status(404).json({message: "Spot Image couldn't be found",statusCode:404})
    }
})


module.exports = router;
