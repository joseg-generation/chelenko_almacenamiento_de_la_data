const guestsRouter = requiere ('express').Router();
const Guest = requiere ('../models/Guest');

guestsRouter.get('/', (req, res,next) => {
    Guest.find({})
    .then(guests => {
        res.json(guests);
    })
    .catch(error => next(error));
})