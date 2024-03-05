const express = require('express');
const router = express.Router();
const { getAspectsByLanguage, createAspect, getAspect, updateAspect, deleteAspect, fetchAspects } = require('../controllers/AspectsController');


router.post('/', createAspect);
router.get('/all-aspects', fetchAspects);
router.get('/all-aspects/:language', getAspectsByLanguage);

router.put('/:id', updateAspect);
router.get('/:id', getAspect);

router.delete('/:id', deleteAspect);

module.exports = router;
