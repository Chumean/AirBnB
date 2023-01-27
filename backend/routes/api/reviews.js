const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { Review, User, Spot, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateReviews = [
    check('review')
    .exists({checkFalsy: true})
    .withMessage("Review text is required"),
    check('stars')
    .exists({checkFalsy: true})
    .isDecimal()
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];



// Get All Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {

    let reviews = [];

    reviews = await Review.findAll({
        attributes: {
            include: [
                "userId",
                "spotId",
                "review",
                "stars"
            ]
        },
        include: [
            {model: User},
            {model: Spot},
            {model: ReviewImage}
            ]

    });


    res.json(reviews);
})




// Add an Image to Review on Review id
router.post('/:reviewId/images', requireAuth, async(req, res) => {

    const currentReview = await Review.findByPk(req.params.reviewId);

    if(!currentReview) {
       return res.status(404).json({message: "Review couldn't be found", statusCode: 404})
    }
    const findImage = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    console.log(findImage)

    // if(findImage.length > 10) {
    //     return res.status(403).json({message: "Maximum number of images for this resource was reached", statusCode: 403})
    // }

    const {url} = req.body;

    const reviewImage = await ReviewImage.create({url, reviewId:req.params.reviewId});

    const resObj = {
        id:reviewImage.id,
        url:reviewImage.url
    }
    return res.status(200).json(resObj)
});

// Edit a Review
router.put('/:reviewId', requireAuth, async(req, res) => {
    try{
        const { review, stars} = req.body;
        const updateReview = await Review.findByPk(req.params.reviewId);
        if(updateReview) {
            if(review) updateReview.review = review;
            if(stars) updateReview.stars = stars;

            await updateReview.save();

            res.json({updateReview})
        } else {
            res.status(404).json({message: "Review couldn't be found"})
        }
    } catch (err) {
        res.status(404).json(handleValidationErrors)
    }
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const rev = Review.findByPk(req.params.reviewId);

    if(rev) {
        await rev.destroy();
        res.status(200).json({message: "Successfully deleted"})
    } else {
        res.status(404).json({message: "Review couldn't be found"})
    }
})
module.exports = router;
