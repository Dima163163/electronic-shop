const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandConrtoller');

router.post('/', brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
