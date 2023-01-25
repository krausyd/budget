const router = require('express').Router();

const categoriesRoutes = require('./categoriesRoutes');
const userApiRoutes = require('./api/userRoutes');

router.use('/categories', categoriesRoutes);
router.use('/api/user', userApiRoutes); //localhost:3001/api/user/login

module.exports = router;